import React, {Component} from 'react';
import LoginForm from '../components/form/LoginForm';

import { Container, Content, Header, Title } from 'native-base';

import myTheme from '../../Themes/myTheme';

export default class LoginContainer extends Component {

  render () {
    return (
      <Container>
        <Content>
          <Header theme={myTheme}>
            <Title>Log In to Jira</Title>
          </Header>
          <LoginForm
            handleLoginButton={this.props.handleLoginButton}
            handleLoginInput={this.props.handleLoginInput}
            handlePasswordInput={this.props.handlePasswordInput}
            handleJiraLinkInput={this.props.handleJiraLinkInput}
            jiraLink={this.props.jiraLink}
            login={this.props.login}
            error={this.props.errorInfo}
          />
        </Content>
      </Container>

    );
  }
}
