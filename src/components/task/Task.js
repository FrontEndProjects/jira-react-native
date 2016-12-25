import React, {Component} from 'react';
import { ActivityIndicator, Linking, StyleSheet, View } from 'react-native';
import { Card, CardItem, Text, Container, Content, Button, InputGroup, Input } from 'native-base';
import postHours from '../../axios/postHours';

export default class Task extends Component {

  constructor (props) {
    super(props);
    this.state = {
      postSuccess: false,
      logging: false,
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
    this.setState({
      logging: true 
    })
    this.props.reloadAfterPost();
    postHours(this.props.username, this.props.password, this.props.userLink, this.props.link, this.state.timeToLog, this);
  }

  handleInput = (num) => {
    this.setState({
      timeToLog: num
    });
  }

  render () {
    let logHours = null;
    if (!this.state.logging) {
      logHours = <Button block onPress={this.handlePostClick}>Log time</Button>;
    } else {
      logHours = <ActivityIndicator />;
    }
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>{this.props.title}</Text>
            </CardItem>
            <CardItem>
              <View style={{ flex: 1, flexDirection: 'row'}}>
                <Text>{this.props.minutes} minutes worked today</Text>
                <Button bordered small onPress={this.handleLinkClick}>Go to jira</Button>
              </View>
              <InputGroup borderType='rounded' >
                  <Input keyboardType='numeric' placeholder='Number of minutes to log' value={this.state.timeToLog} onChangeText={this.handleInput} />
              </InputGroup>
              {logHours}
            </CardItem>
            <CardItem>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  half: {
    width: 50 
  }

});
