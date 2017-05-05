import React, {Component} from 'react';
import { Linking, View } from 'react-native';
import { Text, Content, Button, Input, Form, Item, Label } from 'native-base';
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
    console.log('nav', this.props.navigation);
    return (
        <Content padder>
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.cardTitle}>{this.props.title}</Text>
              <Text style={styles.cardSubtitle}>{this.props.project}</Text>
            </View>
            <View>
              <TaskInfo handleLinkClick={this.handleLinkClick} minutes={this.props.minutes} />
            </View>
            <View style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
                <LogTime logging={this.state.logging} handlePostClick={this.handlePostClick} timeToLog={this.state.timeToLog} handleInput={this.handleInput} disabledButton={this.state.disabledButton} />
            </View>
            <View style={styles.divider}/>

               <TaskTimer />
                {/*<Text>Total logged time in this task: {secondsToTime(this.props.taskTimeSpent, false)}</Text>*/}
          </View>
        </Content>
    );
  }
}

const styles = {
  cardContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 2,
    padding: 16,
    paddingTop: 0,
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#cccccc',
    flexWrap: 'wrap',
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 1
  },
  cardTitle: {
    paddingTop: 24,
    paddingBottom: 0
  },
  cardSubtitle: {
    paddingBottom: 16,
    fontSize: 12,
    color: '#cccccc'
  },
  headerSubtitle: {
    padding: 0
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'transparent',
    marginTop: 16,
    marginBottom: 16
  }
};
