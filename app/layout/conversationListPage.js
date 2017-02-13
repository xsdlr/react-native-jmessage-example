/**
 * Created by xsdlr on 2016/12/5.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Platform,
  Navigator,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
  RecyclerViewBackedScrollView,
  ListView,
  DeviceEventEmitter,
} from 'react-native';
import JMessage from 'react-native-jmessage';
import NavigationBar from 'react-native-navigationbar';
import SeparatorLine from '../components/separatorLine';
import ChatPage from './chatPage';
import Badge from '../components/badge';

export default class ConversationListPage extends Component {
  static propTypes = {
    navigator: Navigator.propTypes.navigator,
  };
  dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });
  state = {
    data: [],
    dataSource: this.dataSource.cloneWithRows([]),
    refreshing: false,
  };
  componentDidMount() {
    this._mounted = true;
    JMessage.addReceiveMessageListener((message) => {
      console.log('message', message);
      this._onRefresh();
    });
    this.emitter = DeviceEventEmitter.addListener('RefreshConversations', this._onRefresh, this);
    this._onRefresh();
  }

  componentWillUnmount() {
    this._mounted = false;
    JMessage.removeAllListener();
    this.emitter.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='default'/>
        <NavigationBar
          title='消息'
          titleColor='black'
          barOpacity={1.0}
          barStyle={styles.navBar}
          statusbarPadding={Platform.OS === 'ios'}
          backIconHidden={true}
        />
        {
          this._renderContent()
        }
      </View>
    );
  }
  _renderContent() {
    const isEmpty = (this.state.dataSource.getRowCount() === 0);
    if (isEmpty) {
      return(
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          contentContainerStyle={styles.list}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              title="正在刷新"
              style={{backgroundColor: 'transparent'}}
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        >
          <View style={{ alignItems: 'center',overflow: 'hidden'}}>
            <Text style={{ fontSize: 16 }}>
              暂时没有记录
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ListView
          showsVerticalScrollIndicator={false}
          enableEmptySections
          bounces={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          initialListSize={6}
          scrollRenderAheadDistance={90}
          onEndReachedThreshold={30}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeparator.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              style={{backgroundColor: 'transparent'}}
              title="正在刷新"
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        />);
    }
  }
  _renderSeparator(sectionID, rowID) {
    return (<SeparatorLine spaceLeftWidth={10} key={`${sectionID}-${rowID}`} />);
  }
  _renderRow(data, sectionID, rowID) {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => this._pressRow(data)}>
          <View style={{flexDirection: 'row', alignItems:'center', height: 70}}>
            <View style={{flex:1, justifyContent: 'center', marginLeft: 10}}>
              <Text style={{marginBottom: 8, color: 'black', fontSize: 16}}>{data.title}</Text>
              <Text style={{color: '#828282', fontSize: 12}}>{data.laseMessage}</Text>
            </View>
            {
              data.unreadCount > 0 ?
              <Badge style={{marginRight: 10, height: 20, width: 20, borderRadius: 10, lineHeight: 20}}>
                {data.unreadCount}
              </Badge> : null
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  _onRefresh() {
    if (this.state.refreshing || !this._mounted) return;
    this.setState({refreshing: true});
    JMessage.allConversations().then(data => {
      console.log('allConversations', data);
      if (!this._mounted) return;
      this.setState({
        data,
        dataSource: this.state.dataSource.cloneWithRows(data),
      });
    }).finally(() => this._mounted && this.setState({refreshing: false}));
  }
  _pressRow(data) {
    console.log('_pressRow', data);
    const {id, title} = data;
    this.props.navigator.push({
      component: ChatPage,
      passProps: {
        cid: id,
        title: title,
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    top: 0,
    left: 0,
    right: 0,
    position: 'relative'
  },
});
