/**
 * Created by xsdlr on 2017/1/10.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ConversationListPage from './conversationListPage';
// import FriendListPage from './friendListPage';
import SettingPage from './settingPage';

export default class MainPage extends Component {
  state = {
    selectedTab: 'conversationList',
  };
  componentDidMount() {
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="default"
        />
        <TabNavigator tintColor='white'>
          {/*会话消息列表界面*/}
          <TabNavigator.Item
            title="消息"
            selectedTitleStyle={styles.selected}
            renderIcon={() => <Image source={require('../images/tab_message_icon.png')} />}
            renderSelectedIcon={() => <Image source={require('../images/tab_message_highlight_icon.png')} />}
            selected={this.state.selectedTab === 'conversationList'}
            onPress={() => {
              this.setState({
                selectedTab: 'conversationList',
              });
            }}>
            <ConversationListPage navigator={this.props.navigator} />
          </TabNavigator.Item>
          {/*好友列表界面*/}
          {/*<TabNavigator.Item*/}
            {/*title="联系人"*/}
            {/*selectedTitleStyle={styles.selected}*/}
            {/*renderIcon={() => <Image source={require('../images/tab_message_icon.png')} />}*/}
            {/*renderSelectedIcon={() => <Image source={require('../images/tab_message_highlight_icon.png')} />}*/}
            {/*selected={this.state.selectedTab === 'friendList'}*/}
            {/*onPress={() => {*/}
              {/*this.setState({*/}
                {/*selectedTab: 'friendList',*/}
              {/*});*/}
            {/*}}>*/}
            {/*<FriendListPage navigator={this.props.navigator} />*/}
          {/*</TabNavigator.Item>*/}
          {/*设置*/}
          <TabNavigator.Item
            title="设置"
            selectedTitleStyle={styles.selected}
            renderIcon={() => <Image source={require('../images/tab_message_icon.png')} />}
            renderSelectedIcon={() => <Image source={require('../images/tab_message_highlight_icon.png')} />}
            selected={this.state.selectedTab === 'setting'}
            onPress={() => {
              this.setState({
                selectedTab: 'setting',
              });
            }}>
            <SettingPage navigator={this.props.navigator} />
          </TabNavigator.Item>
        </TabNavigator>
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