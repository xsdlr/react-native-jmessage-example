/**
 * Created by xsdlr on 2017/1/18.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Navigator,
  ScrollView,
} from 'react-native';
import JMessage from 'react-native-jmessage';
import Navigation from '../components/navigation';
import NavigationBar from 'react-native-navigationbar';
import SettingView from '../components/settingView';
import LoginPage from './loginPage';
import SeparatorLine from '../components/separatorLine';

export default class SettingPage extends Component {
  state = {
    info: {},
  };
  componentDidMount() {
    JMessage.myInfo().then((info) => {
      !this._unmount && this.setState({info});
    }).done();
  }
  componentWillUnmount() {
    this._unmount = true;
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='default'/>
        <NavigationBar
          title='设置'
          titleColor='black'
          barOpacity={1.0}
          barStyle={styles.navBar}
          statusbarPadding={Platform.OS === 'ios'}
          backIconHidden={true}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <SettingView
            text={`姓名：${this.state.info.username}`}
            isRightArrowShow={false}
          />
          <SeparatorLine />
          <SettingView
            text={`昵称：${this.state.info.uickname || ''}`}
            isRightArrowShow={false}
          />
          <SeparatorLine />
          <SettingView
            rightView={
              () => {
                return <Text style={{color: 'red', fontSize: 17, justifyContent: 'center'}}>退出当前账户</Text>;
              }
            }
            rightViewAlign='center'
            isRightArrowShow={false}
            onPress={()=> {
              JMessage.logout();
              this.props.navigator.resetTo({
                component: LoginPage,
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  navBar: {
    top: 0,
    left: 0,
    right: 0,
    position: 'relative'
  },
});