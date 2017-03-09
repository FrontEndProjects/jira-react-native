import React from 'react';
import LoginForm from '../components/form/LoginForm';

import {Container, Content, Header, Title} from 'native-base';

import myTheme from '../../Themes/myTheme';

const LoginContainer = (props) => (
  <Container>
    <Content>
      <Header theme={myTheme}>
        <Title>Log In to Jira</Title>
      </Header>
      <LoginForm
        handleLoginButton={props.handleLoginButton}
        handleLoginInput={props.handleLoginInput}
        handlePasswordInput={props.handlePasswordInput}
        handleJiraLinkInput={props.handleJiraLinkInput}
        jiraLink={props.jiraLink}
        login={props.login}
        password={props.password}
        error={props.errorInfo}
      />
    </Content>
  </Container>

);

export default LoginContainer;
