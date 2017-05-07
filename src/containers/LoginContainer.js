import React from 'react';
import LoginForm from '../components/form/LoginForm';

const LoginContainer = (props) => (
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
);

export default LoginContainer;
