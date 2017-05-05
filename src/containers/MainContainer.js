import React, {Component} from 'react';
import getIssues from '../axios/getIssues';
import getUserInfo from '../axios/getUserInfo';

import LoginContainer from './LoginContainer';
import ContentContainer from './ContentContainer';
import SettingsContainer from './SettingsContainer';

import {Container, Content, Tabs, Tab, Header, Body, Title, Right} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import {View, AsyncStorage, Image} from 'react-native';

import myTheme from '../../Themes/myTheme';

import getStorage from '../storage/getStorage';

import SvgUri from 'react-native-svg-uri';

export default class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      data: [],
      login: '',
      password: '',
      jiraLink: '',
      errorText: '',
      progress: false,
      visible: false,
      showPass: false,
      firstUseApp: true,
      userInfo: '',
      avatar: ''
    };

    this.handleLoginInput = this.handleLoginInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleJiraLinkInput = this.handleJiraLinkInput.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);

    getStorage().load({
      key: 'firstUseApp'
    })
    .then(() => this.setState({ firstUse: false }))
    .catch(() => getStorage().save({ key: 'firstUseApp' }));
  }

  componentDidMount() {
    this.checkRememberPassword();
    this.loadInitialState().done();
  }

  checkRememberPassword() {
    getStorage().load({
      key: 'rememberPass'
    })
    .then(data => { this.setState({ showPass: data.enable }); })
    .catch(() => { this.setState({ showPass: false }); });
  }

  loadInitialState = async () => {
    try {
      const jiraLink = await AsyncStorage.getItem('jiraLink');
      const login = await AsyncStorage.getItem('login');
      const password = await AsyncStorage.getItem('pass');

      if (jiraLink !== null || login !== null) {
        this.setState({jiraLink});
        this.setState({login});
      }
      if (this.state.showPass && password !== null) {
        this.setState({password});
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleLoginInput = async (e) => {
    this.setState({
      login: e
    });
    try {
      await AsyncStorage.setItem('login', e);
    } catch (error) {
      console.log(error);
    }
  }

  handlePasswordInput = async (e) => {
    this.setState({
      password: e
    });
    try {
      await AsyncStorage.setItem('pass', e);
    } catch (error) {
      console.log(error);
    }
  }

  handleJiraLinkInput = async (e) => {
    this.setState({
      jiraLink: e
    });
    try {
      await AsyncStorage.setItem('jiraLink', e);
    } catch (error) {
      console.log(error);
    }
  }

  handleLoginButton() {
    this.setState({
      progress: true,
      visible: true
    });
    getUserInfo(this.state.login, this.state.password, this.state.jiraLink, this);
    getIssues(this.state.login, this.state.password, this.state.jiraLink, this);
  }

  render() {
    if (this.state.progress) {
      return (
        <View style={{flex: 1}}>
          <Spinner visible={this.state.visible}/>
        </View>
      );
    } else if ((!this.state.progress) && (!this.state.isLogged)) {
      return (
        <LoginContainer
          handleLoginButton={this.handleLoginButton}
          handleLoginInput={this.handleLoginInput}
          handlePasswordInput={this.handlePasswordInput}
          handleJiraLinkInput={this.handleJiraLinkInput}
          jiraLink={this.state.jiraLink}
          login={this.state.login}
          password={this.state.password}
          errorInfo={this.state.errorText}
        />
      );
    } else if ((!this.state.progress) && (this.state.isLogged)) {
      console.log(this.state.avatar);
      return (
        <Content>
          <Header>
            <Body>
              <Title>Hello {this.state.userInfo}</Title>
            </Body>
            <Right>
              <SvgUri
                width="32"
                height="32"
                source={{uri: this.state.avatar}}
              />
            </Right>
          </Header>
          <Tabs theme={myTheme}>
            <Tab heading="TASKS">
              <ContentContainer
                issues={this.state.data}
                username={this.state.login}
                password={this.state.password}
                jiraLink={this.state.jiraLink}
              />
            </Tab>
            <Tab heading="SETTINGS">
              <SettingsContainer />
            </Tab>
          </Tabs>
        </Content>
      );
    }
  }
}
