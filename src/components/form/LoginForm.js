import React from 'react';

import {Content, InputGroup, Input, Button, Text, Form, Item} from 'native-base';
import { View } from 'react-native';

import myTheme from '../../../Themes/myTheme';

const LoginForm = (props) => (
  <Content padder>
    <Form>
      <Item style={styles.item}>
        <Input
          placeholder={props.login ? props.login : 'Enter your jira login' }
          onChangeText={props.handleLoginInput}
        />
      </Item>
      <Item style={styles.item}>
        <Input
          placeholder={props.password ? '•••••••••••••' : 'Enter your password' }
          secureTextEntry={true}
          onChangeText={props.handlePasswordInput}
        />
      </Item>
      <Item style={styles.item}>
        <Input
          placeholder={props.jiraLink ? props.jiraLink : 'Enter url to your jira' }
          onChangeText={props.handleJiraLinkInput}
        />
      </Item>

    </Form>
    <Button block onPress={props.handleLoginButton}
            style={{backgroundColor: '#3f51b5', marginTop: 16}} primary><Text>LOGIN</Text></Button>

  </Content>
);

const styles = {
  item: {
    marginLeft: 0
  }
};

export default LoginForm;
