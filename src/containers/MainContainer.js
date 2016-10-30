import React, {Component} from 'react';
import getIssues from '../axios/getIssues';

import LoginContainer from './LoginContainer';
import ContentContainer from './ContentContainer';

import { Container, Content } from 'native-base';

export default class MainContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isLogged: false,
      data: [],
      login: '',
      password: '',
      errorText: '',
      progress: false
    };

    this.handleLoginInput = this.handleLoginInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
  }

  handleLoginInput (e) {
    this.setState({
      login: e.target.value
    });
  }

  handlePasswordInput (e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLoginButton () {
    this.setState({
      progress: true
    });

    getIssues(this.state.login, this.state.password, this);
  }

  render () {
    if (this.state.isLogged) {
      return (
        <Container>
          <Content>
            <ContentContainer
              issues={this.state.data}
              username={this.state.login}
            />
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Content>
            <LoginContainer
              handleLoginButton={this.handleLoginButton}
              handleLoginInput={this.handleLoginInput}
              handlePasswordInput={this.handlePasswordInput}
              errorInfo={this.state.errorText}
            />
          </Content>
        </Container>
      );
    }
  }
}
