import React, {Component} from 'react';
import {Linking, View} from 'react-native';
import {Text, Icon, Content} from 'native-base';
import postHours from '../axios/postHours';
import LogTime from '../components/task/LogTime';
import TaskInfo from '../components/task/TaskInfo';
import TaskTimer from '../components/task/TaskTimer';
import TaskMoreInfo from '../components/task/TaskMoreInfo';

export default class TaskContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logging: false,
      hours: 0,
      minutes: 0,
      timeToLog: 0,
      disabledButton: true,
      more: false,
      activeTask: false
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
  };

  handlePostClick = () => {
    this.setState({
      logging: true
    });
    postHours(this.props.username, this.props.password, this.props.jiraLink, this.props.userLink, this.props.link, this.state.timeToLog, this);
    setTimeout(this.props.reloadAfterPost, 1500);
  };

  handleInputHours = (num) => {
    this.setState({
      hours: +num,
      timeToLog: +num * 60 + this.state.minutes
    });

    if ((num === '') || !(/^[1-9][0-9]*$/.test(num))) {
      this.setState({disabledButton: true});
    } else {
      this.setState({disabledButton: false});
    }
  };

  handleInputMinutes = (num) => {
    this.setState({
      minutes: +num,
      timeToLog: +num + this.state.hours * 60
    });

    if ((num === '') || !(/^[1-9][0-9]*$/.test(num))) {
      this.setState({disabledButton: true});
    } else {
      this.setState({disabledButton: false});
    }
  };

  render() {
    return (
      <Content padder>
        <View style={this.state.activeTask ? [styles.cardContainer, styles.activeTask] : styles.cardContainer}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flex: 0.75}}>
              <Text style={styles.cardTitle}>{this.props.title}</Text>
              <Text style={styles.cardSubtitle}>{this.props.project}</Text>
            </View>
            <Icon
            name={ this.state.more ? 'md-arrow-dropup' : 'md-arrow-dropdown' }
            onPress={() => this.setState({more: !this.state.more, activeTask: !this.state.activeTask})}
            style={{padding: 10}}
            />
          </View>
          {this.state.more && <TaskMoreInfo
            taskTimeSpent={this.props.taskTimeSpent}
            link={this.props.link}
            status={this.props.status}
            reporter={this.props.reporter}
            reporterEmail={this.props.reporterEmail}
            description={this.props.description}
            handleLinkClick={this.handleLinkClick}
            /> }
          <View>
          <TaskInfo handleLinkClick={this.handleLinkClick} minutes={this.props.minutes}/>
          </View>
          <View style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
          <LogTime logging={this.state.logging}
          handlePostClick={this.handlePostClick}
          timeToLog={this.state.timeToLog}
          handleInputMinutes={this.handleInputMinutes}
          handleInputHours={this.handleInputHours}
          disabledButton={this.state.disabledButton}/>
        </View>
        <View style={[styles.divider, styles.dividerTransparent]}/>
          <TaskTimer />
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
    borderRadius: 2,
    flexWrap: 'wrap',
    elevation: 3
  },
  activeTask: {
    backgroundColor: '#E8EAF6'
  },
  cardTitle: {
    paddingTop: 24,
    paddingBottom: 0
  },
  headerSubtitle: {
    padding: 0
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 16,
    marginBottom: 16
  },
  dividerTransparent: {
    backgroundColor: 'transparent'
  }
};
