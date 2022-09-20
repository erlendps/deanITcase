import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const FONT_SIZE = 42;
export const TALK_FONT_SIZE = 22;
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
