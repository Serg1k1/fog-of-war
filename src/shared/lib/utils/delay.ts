export const delay = (delay = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
