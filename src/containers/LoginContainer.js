import React from 'react';
import {Container} from 'native-base';
import LoginForm from '../components/form/LoginForm';
import ErrorLoginInfo from '../components/form/ErrorLoginInfo';

const LoginContainer = (props) => (
  <Container>
    <LoginForm
      handleLoginButton={props.handleLoginButton}
      handleLoginInput={props.handleLoginInput}
      handlePasswordInput={props.handlePasswordInput}
      handleJiraLinkInput={props.handleJiraLinkInput}
      jiraLink={props.jiraLink}
      login={props.login}
      password={props.password}
      error={props.errorInfo}
      disabledButton={props.disabledButton}
    />
    { props.authError && <ErrorLoginInfo/> }
  </Container>
);

export default LoginContainer;
