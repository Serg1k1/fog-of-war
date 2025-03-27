import { SvgProps } from 'react-native-svg';

export interface SvgBasicProps extends SvgProps {
  color?: string;
  height?: number;
  width?: number;
  filled?: boolean;
}
