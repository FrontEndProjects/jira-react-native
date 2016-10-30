import axios from 'axios';

export default function (username, password, obj) {
  return axios({
    url: 'https://jira.nitro-digital.com/rest/tempo-timesheets/3/worklogs/',
    auth: {
      username,
      password
    }
  })
  .then(response => {
    console.log(response);
    obj.setState({
      progress: false,
      isLogged: true,
      data: response.data.issues
    });
    console.log(obj.state.data);
  })
  .catch(error => {
    console.log(error);
    let status = error.response.status === 401 ? 'Incorrect data' : '';
    obj.setState({
      errorText: `${status}`,
      progress: false
    });
  });
}
