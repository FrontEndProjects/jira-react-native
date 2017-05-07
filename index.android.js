import React, { Component } from 'react';
import { AppRegistry, BackHandler, ToastAndroid } from 'react-native';

import MainContainer from './src/containers/MainContainer';
import { Container, Content } from 'native-base';

import strings from './src/language/strings';

export default class JiraApp extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    ToastAndroid.show(strings.press_menu_button, ToastAndroid.SHORT);
    return true;
  };

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
