import React, {Component} from 'react';

import { Card, CardItem, Text, Container, Content } from 'native-base';

export default class Task extends Component {

  render () {
    let href = 'https://jira.nitro-digital.com/browse/' + this.props.link;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>{this.props.title}</Text>
              <Text>{this.props.minutes} minutes worked</Text>
            </CardItem>
            <CardItem>
              <Text>

              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
