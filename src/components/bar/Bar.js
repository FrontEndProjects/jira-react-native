import React, { Component } from 'react';

import { Container, Content, Header, Title } from 'native-base';

export default class Bar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render () {
    return (
      <Container>
        <Content>
          <Header>
            <Title>{this.props.user}</Title>
          </Header>

        </Content>
      </Container>
    );
  }

}
