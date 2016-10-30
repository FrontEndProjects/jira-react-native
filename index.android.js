import React, {Component} from 'react';
import {
  AppRegistry
} from 'react-native';

import MainContainer from './src/containers/MainContainer';

export default class JiraApp extends Component {
  render () {
    return (
      <MainContainer />
    );
  }
}

AppRegistry.registerComponent('JiraApp', () => JiraApp);
