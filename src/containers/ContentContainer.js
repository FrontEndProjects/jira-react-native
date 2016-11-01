import React, {Component} from 'react';
import Task from '../components/task/Task';

import dateFormat from 'dateformat';

import { Container, Content } from 'native-base';

export default class ContentContainer extends Component {

  render () {
    let issues = this.props.issues;
    let issuesNumber = issues.length;
    let Cards = issues.map((elem, idx) => {
      return <Task
        title={elem.fields.summary}
        avatar={elem.fields.reporter.avatarUrls['32x32']}
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
          {Cards}
        </Content>
      </Container>
    );
  }
}
