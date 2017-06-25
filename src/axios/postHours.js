import axios from 'axios';

const getDateAndFormat = () => {
  const dateObj = new Date();
  const arrDate = (dateObj.toString()).split(' ');
  return arrDate[3] + '-' + (dateObj.getMonth() + 1) + '-' + arrDate[2] + 'T' + arrDate[4] + '.000';
};

export default (username, password, jiraLink, authorLink, issueKey, minutes, obj) => {
  const dateString = getDateAndFormat();
  const secToMinutes = (minutes * 60).toString();
  return axios({
    url: `${jiraLink}/rest/tempo-timesheets/3/worklogs/`,
    method: 'POST',
    data: {
      'issue': {
        'key': issueKey
      },
      'author':
      {
        'self': authorLink,
        'name': username
      },
      'comment': 'Working on issue ' + issueKey,
      'dateStarted': dateString,
      'timeSpentSeconds': secToMinutes
    },
    auth: {
      username,
      password
    }
  })
    .then(() => {
      obj.setState({
        timeToLog: 0,
        logging: false,
        postSuccess: true
      });
    })
    .catch(error => {
      console.log(error);
    });
};

