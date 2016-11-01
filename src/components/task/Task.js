import React, {Component} from 'react';

import {Card, CardItem, Text, Container, Content } from 'native-base';

export default class Task extends Component {
  render() {
    let href = 'https://jira.nitro-digital.com/browse/' + this.props.link;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Text>{this.props.title}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
