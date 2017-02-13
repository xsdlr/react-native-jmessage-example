/**
 * Created by xsdlr on 2017/1/18.
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  PixelRatio,
} from 'react-native';
export default class Badge extends React.Component {
  static propTypes = Text.propTypes;
  render() {
    return (
      <Text
        {...this.props}
        numberOfLines={1}
        style={[styles.container, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'red',
    lineHeight: 16,
    height: 16,
    width: 16,
    textAlign: 'center',
    borderWidth: 1 + (1 / PixelRatio.get()),
    borderColor: 'red',
    borderRadius: 8,
    overflow: 'hidden',
  },
});