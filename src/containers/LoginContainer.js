import React from 'react';
import LoginForm from '../components/form/LoginForm';

import {Container, Header, Title, Body} from 'native-base';

import myTheme from '../../Themes/myTheme';

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
    />
);

export default LoginContainer;
