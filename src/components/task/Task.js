import React, {Component} from 'react';

import { Card, CardItem, Text, Container, Content, Button } from 'native-base';

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
              <Button>
                Go to Jira
              </Button>
            </CardItem>
            <CardItem>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
