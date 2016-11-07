import axios from 'axios';

function createArrayWithTaskAndHours (data) {
  const arr = [];
  const len = data.length;

  for (let i = 0; i < len; i++) {
    let secondsWorked = data[i].timeSpentSeconds;
    let id = data[i].issue.id;
    arr.push([id, secondsWorked]);
  }
  return arr;
}

export default function (username, password, obj) {
  return axios({
    url: 'https://jira.nitro-digital.com/rest/tempo-timesheets/3/worklogs/',
    auth: {
      username,
      password
    }
  })
  .then(response => {
    const arr = createArrayWithTaskAndHours(response.data);
    obj.setState({
      arrWithTimes: arr
    });
  })
  .catch(error => {
    console.log(error);
  });
}
