import React, {Component} from 'react';
import getIssues from '../axios/getIssues';

import LoginContainer from './LoginContainer';
import ContentContainer from './ContentContainer';
import SettingsContainer from './SettingsContainer';

import { Container, Content, Tabs } from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'react-native';

import myTheme from '../../Themes/myTheme';

export default class MainContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isLogged: false,
      data: [],
      login: '',
      password: '',
      jiraLink: '',
      errorText: '',
      progress: false,
      visible: false
    };

    this.handleLoginInput = this.handleLoginInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleJiraLinkInput = this.handleJiraLinkInput.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
  }

  handleLoginInput (e) {
    this.setState({
      login: e
    });
  }

  handlePasswordInput (e) {
    this.setState({
      password: e
    });
  }

  handleJiraLinkInput (e) {
    this.setState({
      jiraLink: e
    });
  }

  handleLoginButton () {
    this.setState({
      progress: true,
      visible: true
    });

    getIssues(this.state.login, this.state.password, this.state.jiraLink, this);
  }

  render () {
    if (this.state.progress) {
      return (
        <View style={{flex: 1}}>
          <Spinner visible={this.state.visible}/>
        </View>
      );
    } else if ((!this.state.progress) && (!this.state.isLogged)) {
      return (
        <Container>
          <Content>
            <LoginContainer
              handleLoginButton={this.handleLoginButton}
              handleLoginInput={this.handleLoginInput}
              handlePasswordInput={this.handlePasswordInput}
              handleJiraLinkInput={this.handleJiraLinkInput}
              errorInfo={this.state.errorText}
            />
          </Content>
        </Container>
      );
    } else if ((!this.state.progress) && (this.state.isLogged)) {
      return (
        <Container>
          <Content>
            <Tabs theme={myTheme}>
              <ContentContainer
                tabLabel='Tasks'
                issues={this.state.data}
                username={this.state.login}
                password={this.state.password}
                jiraLink={this.state.jiraLink}
              />
              <SettingsContainer
                tabLabel='Settings'
              />
            </Tabs>
          </Content>
        </Container>
      );
    }
  }
}
