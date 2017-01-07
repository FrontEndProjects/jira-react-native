import React, {Component} from 'react';
import { ActivityIndicator, Linking, StyleSheet, View } from 'react-native';
import { Card, CardItem, Text, Container, Content, Button, InputGroup, Input } from 'native-base';
import postHours from '../axios/postHours';
import LogTime from '../components/task/LogTime';
import TaskInfo from '../components/task/TaskInfo';

export default class TaskContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      logging: false,
      timeToLog: "0"
    };
  }

  handleLinkClick = () => {
    const href = this.props.jiraLink + '/browse/' + this.props.link;

    Linking.canOpenURL(href).then(supported => {
      if (supported) {
        Linking.openURL(href);
      } else {
        console.log('Don\'t know how to open URI: ' + href);
      }
    });
  }

  handlePostClick = () => {
    if (this.state.timeToLog > 0) {
      this.setState({
        logging: true 
      })
      this.props.reloadAfterPost();
      postHours(this.props.username, this.props.password, this.props.jiraLink, this.props.userLink, this.props.link, this.state.timeToLog, this);
    }
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
              <TaskInfo handleLinkClick={this.handlLinkClick} minutes={this.props.minutes} />
              <LogTime logging={this.state.logging} handlePostClick={this.handlePostClick} timeToLog={this.state.timeToLog} handleInput={this.handleInput} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

