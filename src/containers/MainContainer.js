import React, {Component} from 'react';
import isAuth from '../axios/isAuthenticated';

import LoginContainer from './LoginContainer';
import ContentContainer from './ContentContainer';
import SettingsContainer from './SettingsContainer';

import {Container, Content, Tabs, Tab, Header, Body, Title, Right} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import {View, AsyncStorage} from 'react-native';

import myTheme from '../../Themes/myTheme';

import getStorage from '../storage/getStorage';

import SvgUri from 'react-native-svg-uri';

import InternetConnection from '../network/InternetConnection';

import strings from '../language/strings';

import TimerContainer from './TimerContainer';

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
      avatar: '',
      disabledButton: true
    };

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
      this.validateJiraLink(this.state.jiraLink);
    } catch (error) {
      console.log(error);
    }
  };

  handleLoginInput = async (e) => {
    this.setState({
      login: e
    });
    try {
      await AsyncStorage.setItem('login', e);
    } catch (error) {
      console.log(error);
    }
  };

  handlePasswordInput = async (e) => {
    this.setState({
      password: e
    });
    try {
      await AsyncStorage.setItem('pass', e);
    } catch (error) {
      console.log(error);
    }
  };

  handleJiraLinkInput = async (e) => {
    this.setState({
      jiraLink: e
    });
    try {
      await AsyncStorage.setItem('jiraLink', e);
    } catch (error) {
      console.log(error);
    }
    this.validateJiraLink(e);
  };

  handleLoginButton = () => {
    isAuth(this.state.login, this.state.password, this.state.jiraLink, this);
  };

  validateJiraLink = (e) => {
    if ((e === '') || !(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/.test(e))) {
      this.setState({disabledButton: true});
    } else {
      this.setState({disabledButton: false});
    }
  };

  render() {
    if (this.state.progress) {
      return (
        <View style={{flex: 1}}>
          <Spinner visible={this.state.visible}/>
        </View>
      );
    } else if ((!this.state.progress) && (!this.state.isLogged)) {
      return (
        <Container>
          <Header theme={myTheme}>
            <Body>
              <Title>{strings.login_to_jira}</Title>
            </Body>
          </Header>
          <LoginContainer
            handleLoginButton={this.handleLoginButton}
            handleLoginInput={this.handleLoginInput}
            handlePasswordInput={this.handlePasswordInput}
            handleJiraLinkInput={this.handleJiraLinkInput}
            jiraLink={this.state.jiraLink}
            login={this.state.login}
            password={this.state.password}
            errorInfo={this.state.errorText}
            disabledButton={this.state.disabledButton}
          />
          <InternetConnection />
        </Container>
      );
    } else if ((!this.state.progress) && (this.state.isLogged)) {
      return (
        <Content>
          <Header>
            <Body>
              <Title>{`${strings.hello} ${this.state.userInfo}`}</Title>
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
            <Tab heading={`(${Object.keys(this.state.data).length}) ${strings.tasks}`}>
              <TimerContainer />
              <ContentContainer
                issues={this.state.data}
                username={this.state.login}
                password={this.state.password}
                jiraLink={this.state.jiraLink}
              />
            </Tab>
            <Tab heading={strings.settings}>
              <SettingsContainer />
            </Tab>
          </Tabs>
        </Content>
      );
    }
  }
}
