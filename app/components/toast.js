/**
 * Created by xsdlr on 2017/1/10.
 */
import Toast from 'react-native-root-toast';

const defaultOptions = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  shadow: false,
  animation: true,
  hideOnPress: true,
  delay: 0,
};

export const show = (message, option) => {
  return Toast.show(message, {...defaultOptions, ...option});
};
export const hide = Toast.hide;
export default {
  show,
  hide,
};