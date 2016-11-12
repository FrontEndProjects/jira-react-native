import React, {Component} from 'react';
import { Linking } from 'react-native';

import { Card, CardItem, Text, Container, Content, Button } from 'native-base';

export default class Task extends Component {

  handleClick = () => {
    const href = 'https://jira.nitro-digital.com/browse/' + this.props.link;

    Linking.canOpenURL(href).then(supported => {
      if (supported) {
        Linking.openURL(href);
      } else {
        console.log('Don\'t know how to open URI: ' + href);
      }
    });
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>{this.props.title}</Text>
              <Text>{this.props.minutes} minutes worked</Text>
              <Text onPress={this.handleClick}>Go to jira</Text>
            </CardItem>
            <CardItem>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
