import React from 'react';

import {Content, Input, Button, Text, Form, Item} from 'native-base';

import strings from '../../language/strings';

const LoginForm = (props) => (
  <Content padder>
    <Form>
      <Item style={styles.item}>
        <Input
          placeholder={props.login ? props.login : strings.enter_your_jira_login }
          onChangeText={props.handleLoginInput}
        />
      </Item>
      <Item style={styles.item}>
        <Input
          placeholder={props.password ? '•••••••••••••' : strings.enter_your_password }
          secureTextEntry={true}
          onChangeText={props.handlePasswordInput}
        />
      </Item>
      <Item style={styles.item}>
        <Input
          placeholder={props.jiraLink ? props.jiraLink : strings.enter_url_to_your_jira }
          onChangeText={props.handleJiraLinkInput}
        />
      </Item>

    </Form>
    <Button disabled={props.disabledButton} block onPress={props.handleLoginButton}
            style={{marginTop: 16}}><Text>{strings.login}</Text></Button>

  </Content>
);

const styles = {
  item: {
    marginLeft: 0
  }
};

export default LoginForm;
