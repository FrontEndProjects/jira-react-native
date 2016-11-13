import React, {Component} from 'react';
import {
  AppRegistry
} from 'react-native';

import MainContainer from './src/containers/MainContainer';
import {Container, Content} from 'native-base';

export default class JiraApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timing: false
    };
  }

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
