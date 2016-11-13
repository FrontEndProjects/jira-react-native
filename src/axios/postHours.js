import axios from 'axios';

function getDateAndFormat() {
  const dateObj = new Date();
  const arrDate = (dateObj.toString()).split(" ");
  return arrDate[3] + '-' + (dateObj.getMonth() + 1) + '-' + arrDate[2] + 'T' + arrDate[4] + '.000';
}

export default function (username, password, authorLink, issueKey, minutes, obj) {
  const dateString = getDateAndFormat();
  console.log(dateString);
  const secToMinutes = ( minutes * 60 ).toString();
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
      "dateStarted": dateString,
      "timeSpentSeconds": secToMinutes
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

