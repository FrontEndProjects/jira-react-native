import React from 'react';
import { AppRegistry } from 'react-native';

import MainContainer from './src/containers/MainContainer';
import { Container, Content } from 'native-base';

const JiraApp = () => (
  <Container>
    <Content>
      <MainContainer />
    </Content>
  </Container>
);

AppRegistry.registerComponent('JiraApp', () => JiraApp);
