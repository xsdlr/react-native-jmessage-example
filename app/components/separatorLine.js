/**
 * Created by xsdlr on 2017/1/10.
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class SeparatorLine extends Component {
  static propTypes = {
    spaceLeftWidth: PropTypes.number,
    spaceRightWidth: PropTypes.number,
    color: PropTypes.string,
    spaceColor: PropTypes.string,
  };
  static defaultProps = {
    spaceLeftWidth: 0,
    spaceRightWidth: 0,
    color: '#E0E0E0',
    spaceColor: 'white',
  };
  render() {
    return (
      <View style={{height:1, flexDirection: 'row'}}>
        <View style={{backgroundColor: this.props.spaceColor, width: this.props.spaceLeftWidth}} />
        <View style={{backgroundColor: this.props.color, flex: 1}} />
        <View style={{backgroundColor: this.props.spaceColor, width: this.props.spaceRightWidth}} />
      </View>
    );
  }
}