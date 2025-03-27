import axios, { AxiosError, AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse & { success: boolean; cancelled: boolean };

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// Create axios instances with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  //   timeout: 10000, // 10 seconds
});

const axiosNonAbortInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  //   timeout: 10000, // 10 seconds
});

// Track ongoing requests for potential cancellation
const ongoingRequests = new Map<string, AbortController>();

// Abort all ongoing requests
export function abortAllRequests() {
  ongoingRequests.forEach((abortController) => abortController.abort());
  ongoingRequests.clear();
}

// Common interceptor logic
const interceptorBody = async (config: InternalAxiosRequestConfig, withAbort: boolean) => {
  // Add auth token if available (example)
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  if (withAbort) {
    // Create a unique key for this request
    const requestKey = `${config.method}:${config.url}`;

    // Set up abort controller for this request
    const abortController = new AbortController();
    config.signal = abortController.signal;

    // Cancel duplicate requests (optional)
    if (ongoingRequests.has(requestKey)) {
      abortController.abort();
      return config;
    }

    // Store the controller for potential later cancellation
    ongoingRequests.set(requestKey, abortController);
  }

  return config;
};

// Request interceptors
axiosInstance.interceptors.request.use(
  (config) => interceptorBody(config, true),
  (error) => Promise.reject(error)
);

axiosNonAbortInstance.interceptors.request.use(
  (config) => interceptorBody(config, false),
  (error) => Promise.reject(error)
);

// Response interceptor factory
const responseInterceptor: (withAbort: boolean) => ResponseInterceptor = (withAbort) => (response) => {
  if (withAbort) {
    const requestKey = `${response.config.method}:${response.config.url}`;
    ongoingRequests.delete(requestKey);
  }
  return { ...response, success: true, cancelled: false };
};

// Error handler factory
const handleError = async (error: any, withAbort: boolean) => {
  // Handle cancelled requests
  if (axios.isCancel(error)) {
    return Promise.resolve({
      success: false,
      cancelled: true,
      data: null,
    });
  }

  // Clean up the request from tracking
  if (error.config && withAbort) {
    const requestKey = `${error.config.method}:${error.config.url}`;
    ongoingRequests.delete(requestKey);
  }

  // Handle authentication errors (401)
  if (error instanceof AxiosError && error.response?.status === 401) {
    // Example token refresh logic
    // if (!error.config._retry) {
    //   error.config._retry = true;
    //   try {
    //     // Refresh token logic here
    //     // const newToken = await refreshToken();
    //     // error.config.headers.Authorization = `Bearer ${newToken}`;
    //     // return axiosInstance(error.config);
    //   } catch (refreshError) {
    //     // Handle refresh failure
    //   }
    // }
  }

  // Return standardized error format
  return Promise.reject({
    success: false,
    cancelled: false,
    status: error.response?.status,
    message: error.message,
    ...error,
  });
};

// Response interceptors
axiosInstance.interceptors.response.use(responseInterceptor(true), async (error) => handleError(error, true));

axiosNonAbortInstance.interceptors.response.use(responseInterceptor(false), async (error) => handleError(error, false));

export { axiosInstance, axiosNonAbortInstance };
