/**
 * Created by xsdlr on 2017/1/18.
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

export default class SettingView extends Component {
  static propTypes = {
    style: View.propTypes.style,
    src: Image.propTypes.source,
    text: PropTypes.string,
    textStyle: Text.propTypes.style,
    detailText: PropTypes.string,
    detailTextStyle: Text.propTypes.style,
    onPress: TouchableWithoutFeedback.propTypes.onPress,
    rightViewAlign: PropTypes.oneOf([ 'flex-start', 'flex-end', 'center', 'space-between', 'space-around' ]),
    rightView: PropTypes.func,
    isRightArrowShow: PropTypes.bool,
  };
  static defaultProps = {
    isRightArrowShow: true,
    rightViewAlign: 'flex-end',
  };
  _renderRightView() {
    const rightView = this.props.rightView();
    return React.cloneElement(rightView, {
      style: rightView.props.style,
    });
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={ this.props.onPress }>
        <View style={[styles.container, this.props.style]}>
          {
            this.props.src ?
              <Image
                style={styles.circleIcon}
                source={this.props.src}
              /> : null
          }
          {
            this.props.src ?
              <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text> :
              this.props.text ?
                <Text style={[styles.text, this.props.textStyle, {marginLeft: 12}]}>{this.props.text}</Text> :
                null
          }
          <View style={[styles.centerWrapper, {justifyContent: this.props.rightViewAlign}]}>
            {
              this.props.rightView  ? this._renderRightView() : <Text style={[styles.detailText, this.props.detailTextStyle]}>{this.props.detailText}</Text>
            }
          </View>
          {
            this.props.isRightArrowShow ?
              <Image
                style={styles.icon}
                source={require('../images/more_icon.png') }
              /> : null
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  circleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  centerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    color: '#828282',
  },
  icon: {
    tintColor: '#828282',
    marginLeft: 10,
    marginRight: 10,
  },
});
