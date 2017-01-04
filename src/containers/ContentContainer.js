import React, {Component} from 'react';
import TaskContainer from './TaskContainer';
import TopBar from '../components/topbar/TopBar';

import getHours from '../axios/getHours';
import { Container, Content } from 'native-base';

export default class ContentContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      reload: false,
      arrWithTimes: []
    };
  }

  componentDidMount () {
    getHours(this.props.username, this.props.password, this);
  }

  componentWillUpdate () {
    getHours(this.props.username, this.props.password, this);
  }

  getTimeForIssue (issueId) {
    let timeWorked = 0;
    const that = this;
    for (item of that.state.arrWithTimes) {
      if (item[0] == issueId) {
        timeWorked += item[1];
      }
    }
    return timeWorked/60;
  }

  getAllLoggedTime () {
    const that = this;
    return that.state.arrWithTimes.reduce( ((a, b) => a + b[1]), 0)/60;
  }

  reloadAfterPost = () => {
    this.setState({
      reload: !this.state.reload  
    });
  }

  render () {
    let issues = this.props.issues;
    let that = this;
    let allTimeLogged = that.getAllLoggedTime();
    let Cards = issues.map((elem, idx) => {
      let minutes = that.getTimeForIssue(elem.id);
      return <TaskContainer
        reloadAfterPost={that.reloadAfterPost.bind(that)}
        title={elem.fields.summary}
        username={this.props.username}
        password={this.props.password}
        avatar={elem.fields.reporter.avatarUrls['32x32']}
        userLink = {elem.fields.assignee.self}
        arrWithTimes={this.state.arrWithTimes}
        minutes={minutes}
        link={elem.key}
        reporter={elem.fields.reporter.displayName}
        reporterEmail={elem.fields.reporter.emailAddress}
        project={elem.fields.project.name}
        key={idx}
      />;
      });

    return (
      <Container>
        <Content>
          <TopBar allTimeLogged={allTimeLogged} />
        </Content>
        <Content>
          {Cards}
        </Content>
      </Container>
    );
  }
}
