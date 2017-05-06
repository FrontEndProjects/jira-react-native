import React, { Component } from 'react';
import { AppRegistry, BackHandler } from 'react-native';

import MainContainer from './src/containers/MainContainer';
import { Container, Content } from 'native-base';

export default class JiraApp extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => (true);

  render() {
    return (
      <Container>
        <Content>
          <MainContainer />
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('JiraApp', () => JiraApp);
