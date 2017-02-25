import React from 'react';

import {Content, InputGroup, Input, Button} from 'native-base';

function LoginForm(props) {
  return (
    <Content>
      <InputGroup>
        <Input
          placeholder={props.login ? props.login : 'Enter your jira login' }
          onChangeText={props.handleLoginInput}
        />
      </InputGroup>
      <InputGroup>
        <Input
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={props.handlePasswordInput}
        />
      </InputGroup>
      <InputGroup>
        <Input
          placeholder={props.jiraLink ? props.jiraLink : 'Enter url to your jira' }
          onChangeText={props.handleJiraLinkInput}
        />
      </InputGroup>
      <Button block primary onPress={props.handleLoginButton}>Login</Button>
    </Content>
  );
}

export default LoginForm;
