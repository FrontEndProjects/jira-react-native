import axios from 'axios';

export default function (username, password, authorLink, issueKey, minutes, obj) {
  return axios({
    url: 'https://jira.nitro-digital.com/rest/tempo-timesheets/3/worklogs/',
    method: 'POST',
    data: {
      "issue": {
        "key": issueKey
      },
      "author":
      {
        "self": authorLink,
        "name":  username
      },
      "comment": "Working on issue " + issueKey,
      "dateStarted": "2016-11-13T13:22:00.000",
      "timeSpentSeconds": minutes
    }, 
    auth: {
      username,
      password
    }
  })
    .then(response => {
      obj.setState({
        timeToLog: "0",
        postSuccess: true
      });
    })
    .catch(error => {
      console.log(error);
    });
}

