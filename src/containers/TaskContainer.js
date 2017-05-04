import React, {Component} from 'react';
import { Linking } from 'react-native';
import { Card, CardItem, Text, Container, Content } from 'native-base';
import postHours from '../axios/postHours';
import LogTime from '../components/task/LogTime';
import TaskInfo from '../components/task/TaskInfo';
import secondsToTime from '../helpers/secondsToTime';
import TaskTimer from '../components/task/TaskTimer';

export default class TaskContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      logging: false,
      timeToLog: '0',
      disabledButton: true
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
    this.setState({
      logging: true
    });
    postHours(this.props.username, this.props.password, this.props.jiraLink, this.props.userLink, this.props.link, this.state.timeToLog, this);
    setTimeout(this.props.reloadAfterPost, 1500);
  };

  handleInput = (num) => {
    this.setState({
      timeToLog: num
    });

    if ((num === '') || !(/^[1-9][0-9]*$/.test(num))) {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
  };

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>{this.props.title}</Text>
            </CardItem>
            <CardItem>
              <TaskInfo handleLinkClick={this.handleLinkClick} minutes={this.props.minutes} />
              <LogTime logging={this.state.logging} handlePostClick={this.handlePostClick} timeToLog={this.state.timeToLog} handleInput={this.handleInput} disabledButton={this.state.disabledButton} />
            </CardItem>
            <CardItem>
              <TaskTimer />
            </CardItem>
            <CardItem>
              <Text>Total logged time in this task: {secondsToTime(this.props.taskTimeSpent, false)}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

