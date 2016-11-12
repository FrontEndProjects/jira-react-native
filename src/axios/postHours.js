import axios from 'axios';

export default function (username, password, authorLink, issueKey, minutes, obj) {
  return axios({
    url: 'https://jira.nitro-digital.com/rest/tempo-timesheets/3/worklogs/',
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
      "dateStarted": getFormattedDate(),
      "timeSpentSeconds": minutes
    } 
    auth: {
      username,
      password
    }
  })
    .then(response => {
      obj.setState({
        postSuccess: true
      });
    })
    .catch(error => {
      console.log(error);
    });
}

