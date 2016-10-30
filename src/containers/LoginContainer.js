import React, {Component} from 'react';
import LoginForm from '../components/form/LoginForm';

import { Container, Content } from 'native-base';

export default class LoginContainer extends Component {

  render () {
    return (
      <Container>
        <Content>
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
