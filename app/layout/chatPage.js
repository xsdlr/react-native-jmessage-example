/**
 * Created by xsdlr on 2017/1/16.
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Platform,
  Navigator,
  DeviceEventEmitter,
} from 'react-native';
import JMessage from 'react-native-jmessage';
import NavigationBar from 'react-native-navigationbar';
import SeparatorLine from '../components/separatorLine';
import { GiftedChat } from 'react-native-gifted-chat';
import { isEmpty } from 'lodash';
import Toast from '../components/toast';

export default class ChatPage extends Component {
  static propTypes = {
    navigator: Navigator.propTypes.navigator,
    cid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };
  state = {
    messages: []
  };
  componentWillMount() {
    JMessage.addReceiveMessageListener((message) => {
      console.log('receive', message);
      !this._unmount && this.setState((preState) => {
        return {
          messages: GiftedChat.append(preState.messages, this._transformMessage(message)),
        };
      });
    });
    JMessage.historyMessages(this.props.cid, this.state.messages.length, 10).then((messages) => {
      console.log('messages', messages);
      const _messages = messages.map(this._transformMessage);
      this.setState({
        messages: _messages
      });
    });
    JMessage.myInfo().then((info) => {
      this.setState({username: info.username});
    });
    JMessage.clearUnreadCount(this.props.cid).then((count) => {
      count > 0 && DeviceEventEmitter.emit('RefreshConversations');
    }).done();
  }

  componentWillUnmount() {
    JMessage.removeAllListener();
    this._unmount = true;
  }
  onSend(messages = []) {
    for (const message of messages) {
      console.log('send message textInput', message);
      let type, data;
      if (message.text) {
        type = 'text';
        data = {text: message.text};
      } else if (message.image) {
        type = 'image';
        data = {image: message.image};
      } else {
        return;
      }
      JMessage.sendMessageByCID({
        cid: this.props.cid,
        type: type,
        data: data,
      }).then((_msg) => {
        console.log('send message', _msg);
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, [message]),
          };
        });
      }).catch(error => {
        const { code, message } = error;
        if(code == 803005) {
          Toast.show('您不在这个群中');
        } else {
          Toast.show(message);
        }
      });
    }
  }
  _transformMessage(message) {
    const {content={}, from={}, contentType=0} = message;
    const _message = {};
    switch (contentType) {
      case 1:
        _message.text = content.text;
        break;
      case 2:
        _message.image = content.mediaLink;
        break;
      case 5:
        const {userDisplayNames=[], eventNotificationType=''} = content;
        let memo = '';
        console.log('event', eventNotificationType);
        switch (eventNotificationType) {
          case 'group_member_removed':
            memo = '被踢出群';
            break;
          case 'group_member_added':
            memo = '加入群';
            break;
          default:
            break;
        }
        _message.text = `${userDisplayNames.join(',')} ${memo}`;
        break;
    }
    return {
      ..._message,
      _id: message.msgId,
      serverId: message.serverMessageId,
      createdAt: new Date(message.timestamp),
      user: {
        _id: from.name,
        name: from.nickname || from.name,
        avatar: from.avatar,
      },
    };
  }
  _back() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.props.title}
          titleColor='black'
          barStyle={styles.navBar}
          statusbarPadding={Platform.OS === 'ios'}
          backFunc={this._back.bind(this)}
        />
        <GiftedChat
          style={{backgroundColor: 'white'}}
          locale="zh-cn"
          messages={this.state.messages}
          onSend={this.onSend.bind(this)}
          isAnimated={true}
          user={{
            _id: this.state.username,
          }}
        />
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
