import React, {Component} from 'react';

import {Card, CardItem, Text} from 'native-base';

export default class Task extends Component {
  render () {
    let href = 'https://jira.nitro-digital.com/browse/' + this.props.link;
    return (
      <Card
      >
        <CardItem
        >
          <Text>{this.props.title}</Text>
        </CardItem>
      </Card>
    );
  }
}
