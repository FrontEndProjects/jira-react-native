import React, {Component} from 'react';
import {
  AppRegistry
} from 'react-native';

import MainContainer from './src/containers/MainContainer';
import Notification from './src/notifications/Notification';

import {Container, Content} from 'native-base';

export default class JiraApp extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Notification />
          <MainContainer />
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('JiraApp', () => JiraApp);
