import React, {Component} from 'react';

import {Content, InputGroup, Input, Button} from 'native-base';

export default class LoginForm extends Component {
  render () {
    return (
      <Content>
        <InputGroup>
          <Input
            placeholder="Enter your login"
            onChange={this.props.handleLoginInput}
          />
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            onChange={this.props.handlePasswordInput}
          />
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="Enter your link"
            onChange={this.props.handleLoginInput}
          />
        </InputGroup>
        <Button block primary onPress={this.props.handleLoginButton}>Login</Button>
      </Content>
    );
  }
}
