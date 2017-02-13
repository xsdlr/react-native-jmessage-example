/**
 * Created by xsdlr on 2017/1/10.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import JMessage from 'react-native-jmessage';
import NavigationBar from 'react-native-navigationbar';

export default class FriendListPage extends Component {
  componentDidMount() {
    JMessage.addReceiveMessageListener((message) => {
      console.log('receive', message);
    });
  }
  componentWillUnmount() {
    JMessage.removeAllListener();
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='联系人'
          titleColor='black'
          barOpacity={1.0}
          barStyle={styles.navBar}
          statusbarPadding={Platform.OS === 'ios'}
          backIconHidden={true}
        />
        <View style={{backgroundColor: 'red'}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});