import React, {Component} from 'react';
import LoginForm from '../components/form/LoginForm';

import { Container, Content, Header, Title } from 'native-base';

export default class LoginContainer extends Component {

  render () {
    return (
      <Container>
        <Content>
          <Header>
            <Title>Log In to Jira</Title>
          </Header>
          <LoginForm
            handleLoginButton={this.props.handleLoginButton}
            handleLoginInput={this.props.handleLoginInput}
            handlePasswordInput={this.props.handlePasswordInput}
            error={this.props.errorInfo}
          />
        </Content>
      </Container>

    );
  }
}
