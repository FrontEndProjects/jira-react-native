import axios from 'axios';

const createArrayWithTaskAndHours = (data) => {
  const arr = [];

  arr.forEach(item => {
    let secondsWorked = data[item].timeSpentSeconds;
    let id = data[item].issue.id;
    arr.push([id, secondsWorked]);
  });

  return arr;
};

export default (username, password, jiraLink, obj) => (
  axios({
    url: `${jiraLink}/rest/tempo-timesheets/3/worklogs/`,
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
    })
);
