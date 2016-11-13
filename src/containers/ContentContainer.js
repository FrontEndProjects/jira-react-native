import React, {Component} from 'react';
import Task from '../components/task/Task';
import TopBar from '../components/topbar/TopBar';

import getHours from '../axios/getHours';
import { Container, Content } from 'native-base';

export default class ContentContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      arrWithTimes: []
    };
  }

  componentDidMount () {
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

  render () {
    let issues = this.props.issues;
    let that = this;
    let allTimeLogged = that.getAllLoggedTime();
    let Cards = issues.map((elem, idx) => {
      let minutes = that.getTimeForIssue(elem.id);
      return <Task
        title={elem.fields.summary}
        avatar={elem.fields.reporter.avatarUrls['32x32']}
        arrWithTimes={this.state.arrWithTimes}
        minutes={minutes}
        link={elem.key}
        id={elem.key}
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
