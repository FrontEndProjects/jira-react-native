import React, {Component} from 'react';

import {Container, Content, InputGroup, Input, Button} from 'native-base';

export default class LoginForm extends Component {
  render () {
    return (
      <Container>
        <Content>
          <InputGroup>
            <Input placeholder="Enter your login"/>
            onChange={this.props.handleLoginInput}
          </InputGroup>

          <InputGroup>
            <Input placeholder="Enter your password"/>
            onChange={this.props.handlePasswordInput}
          </InputGroup>

          <InputGroup>
            <Input placeholder="Enter your login"/>
            onChange={this.props.handleLoginInput}
          </InputGroup>
          <Button primary onPress={this.props.handleLoginButton}> Primary </Button>
        </Content>
      </Container>
    );
  }
}
