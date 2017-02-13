/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import PretreatmentPage from './app/layout/pretreatmentPage';

export default class Example extends Component {
  render() {
    return (
      <PretreatmentPage />
    );
  }
}

AppRegistry.registerComponent('Example', () => Example);
