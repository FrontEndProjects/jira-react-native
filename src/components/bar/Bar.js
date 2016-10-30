import React, { Component } from 'react';

import { Container, Content } from 'native-base';

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

        </Content>
      </Container>
    );
  }

}
