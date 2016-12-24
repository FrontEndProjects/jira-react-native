import React, {Component} from 'react';
import { Linking } from 'react-native';
import { Card, CardItem, Text, Container, Content, Button, InputGroup, Input } from 'native-base';
import postHours from '../../axios/postHours';

export default class Task extends Component {

  constructor (props) {
    super(props);
    this.state = {
      postSuccess: false,
      timeToLog: "0"
    };
  }

  handleLinkClick = () => {
    const href = 'https://jira.nitro-digital.com/browse/' + this.props.link;

    Linking.canOpenURL(href).then(supported => {
      if (supported) {
        Linking.openURL(href);
      } else {
        console.log('Don\'t know how to open URI: ' + href);
      }
    });
  }

  handlePostClick = () => {
    this.props.reloadAfterPost();
    console.log(this.props.reloadAfterPost, 'in child');
    postHours(this.props.username, this.props.password, this.props.userLink, this.props.link, this.state.timeToLog, this);
  }

  handleInput = (num) => {
    this.setState({
      timeToLog: num
    });
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>{this.props.title}</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.minutes} minutes worked today</Text>
              <Button bordered small onPress={this.handleLinkClick}>Go to jira</Button>
              <InputGroup borderType='rounded' >
                  <Input keyboardType='numeric' placeholder='Number of minutes to log' value={this.state.timeToLog} onChangeText={this.handleInput} />
              </InputGroup>
              <Button block onPress={this.handlePostClick}>Log time</Button>
            </CardItem>
            <CardItem>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
