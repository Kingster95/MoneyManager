import { Dimensions, PixelRatio, Platform } from 'react-native';

const responsiveFont = (size: number) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

const size = {
  extraLarge:responsiveFont(50),
  h1: responsiveFont(38),
  h2: responsiveFont(32),
  h3: responsiveFont(30),
  h4: responsiveFont(26),
  h5: responsiveFont(20),
  h6: responsiveFont(19),
  input: responsiveFont(18),
  regular: responsiveFont(16),
  medium: responsiveFont(14),
  small: responsiveFont(12),
  tiny: responsiveFont(8.5),
  iconMap: responsiveFont(23),
};

export default size;
