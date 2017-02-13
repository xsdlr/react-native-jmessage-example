/**
 * Created by xsdlr on 2017/1/10.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import JMessage from 'react-native-jmessage';
import LoginPage from './loginPage';
import MainPage from './mainPage';
import Navigation from '../components/navigation';
import { Send, Composer } from 'react-native-gifted-chat';

export default class PretreatmentPage extends Component {
  state = {
    isLoggedIn: false,
    fetchLoginState: true,
  };
  componentWillMount() {
    Send.defaultProps.label = '发送';
    Composer.defaultProps.placeholder = '请输入...';
  }
  componentDidMount() {
    JMessage.init();
    JMessage.isLoggedIn()
      .then((isLoggedIn) => {
        this.setState({isLoggedIn});
        console.log('isLoggedIn', isLoggedIn);
      })
      .finally(() => this.setState({fetchLoginState: false}));
  }
  componentWillUnmount() {
    this._unmount = true;
  }
  render() {
    if (this.state.fetchLoginState) {
      return this._renderHitView();
    } else if(this.state.isLoggedIn) {
      return (
        <Navigation initialRoute={{component: MainPage}} />
      );
    } else {
      return (
        <Navigation initialRoute={{component: LoginPage}} />
      );
    }
  }
  _renderHitView() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          正在获取登陆状态....
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
  }
});