import React from 'react';
import LoginForm from '../components/form/LoginForm';

import {Container, Header, Title, Body} from 'native-base';

import myTheme from '../../Themes/myTheme';

const LoginContainer = (props) => (
    <Container>
      <Header theme={myTheme}>
        <Body>
          <Title>Log In to Jira</Title>
        </Body>
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
    </Container>
);

export default LoginContainer;
