/**
 * Created by xsdlr on 2017/1/6.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Navigator,
} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import JMessage from 'react-native-jmessage';
import SeparatorLine from '../components/separatorLine';
import Toast from '../components/toast';
import MainPage from './mainPage';

export default class LoginPage extends Component {
  static propTypes = {
    navigator: Navigator.propTypes.navigator,
  };
  state = {
    account: '',
    password: '',
    isLoggedIn: false,
  };
  componentWillMount() {
    JMessage.isLoggedIn().then((isLoggedIn) => {
      this.setState({isLoggedIn});
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 100}} />
        <TextInput
          ref='account'
          style={styles.account}
          autoCapitalize='none'
          keyboardType='default'
          placeholder='账号'
          returnKeyType='next'
          clearButtonMode='while-editing'
          enablesReturnKeyAutomatically={true}
          underlineColorAndroid='transparent'
          blurOnSubmit={false}
          onSubmitEditing={() => this.refs['password'].focus()}
          onChangeText={this._accountChange.bind(this)}
        />
        <SeparatorLine spaceLeftWidth={15} spaceRightWidth={15} />
        <TextInput
          ref='password'
          style={styles.password}
          autoCapitalize='none'
          keyboardType='default'
          placeholder='密码'
          returnKeyType='done'
          secureTextEntry={true}
          clearButtonMode='while-editing'
          enablesReturnKeyAutomatically={true}
          underlineColorAndroid='transparent'
          onSubmitEditing={() => this.refs['password'].focus()}
          onChangeText={this._passwordChange.bind(this)}
        />
        <SeparatorLine spaceLeftWidth={15} spaceRightWidth={15} />
        <View style={styles.button}>
        <Button
          onPress={()=>this._login()}
          title='登录'
          color='black'
        />
        </View>
      </View>
    );
  }
  _accountChange(account) {
    this.setState({account});
  }
  _passwordChange(password) {
    this.setState({password});
  }
  _login() {
    dismissKeyboard();
    const {account, password} = this.state;
    JMessage.login(account, password).then((info) => {
      console.log('user login', info);
      this.props.navigator.resetTo({component: MainPage})
    }).catch(error => {
      Toast.show(error.message)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  account: {
    marginHorizontal: 15,
    height: 44,
  },
  password: {
    marginHorizontal: 15,
    height: 44,
  },
  button: {
    marginTop: 30,
  }
});