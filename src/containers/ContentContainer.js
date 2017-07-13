import React, {Component} from 'react';
import TaskContainer from './TaskContainer';
import TopBar from '../components/topbar/TopBar';

import getHours from '../axios/getHours';

import {Content} from 'native-base';

import { FlatList, View } from 'react-native';

export default class ContentContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrWithTimes: []
    };
  }

  componentDidMount() {
    getHours(this.props.username, this.props.password, this.props.jiraLink, this);
  }

  getTimeForIssue(issueId) {
    let timeWorked = 0;
    const that = this;
    for (let item of that.state.arrWithTimes) {
      if (String(item[0]) === issueId) {
        timeWorked += item[1];
      }
    }
    return timeWorked / 60;
  }

  getAllLoggedTime() {
    const that = this;
    return that.state.arrWithTimes.reduce((a, b) => a + b[1], 0) / 60;
  }

  reloadAfterPost() {
    getHours(this.props.username, this.props.password, this.props.jiraLink, this);
  }

  renderItem = ({item}) => {
    let that = this;
    let minutes = that.getTimeForIssue(item.id);
    return <TaskContainer
      reloadAfterPost={that.reloadAfterPost.bind(that)}
      title={item.fields.summary}
      username={this.props.username}
      password={this.props.password}
      jiraLink={this.props.jiraLink}
      userLink={item.fields.assignee.self}
      arrWithTimes={this.state.arrWithTimes}
      minutes={minutes}
      link={item.key}
      reporter={item.fields.reporter.displayName}
      reporterEmail={item.fields.reporter.emailAddress}
      project={item.fields.project.name}
      taskTimeSpent={item.fields.timespent}
      description={item.fields.description}
      status={item.fields.status.name}
    />;
  };

  render() {
    let that = this;
    let allTimeLogged = that.getAllLoggedTime();

    return (
      <View>
        <TopBar allTimeLogged={allTimeLogged}/>
        <FlatList
          data={this.props.issues}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
