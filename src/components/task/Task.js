import React, {Component} from 'react';
import { Linking } from 'react-native';

import { Card, CardItem, Text, Container, Content, Button, InputGroup, Input } from 'native-base';

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
    console.log(this.props);
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>{this.props.title}</Text>
              <Text>{this.props.minutes} minutes worked</Text>
              <Button onPress={this.handleClick}>Go to jira</Button>
            </CardItem>
            <CardItem>
              <InputGroup borderType='rounded' >
                  <Input keyboardType='numeric' placeholder='Number of minutes to log'/>
              </InputGroup>
              <Button onPress={this.handleClick}>Log time</Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
