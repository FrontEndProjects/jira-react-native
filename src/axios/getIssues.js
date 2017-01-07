import axios from 'axios';

export default function (username, password, jiraLink, obj) {
  return axios({
    url: `${jiraLink}/rest/api/2/search?jql=status%20in%20(Open%2C%20%22In%20Progress%22)%20AND%20assignee%20in%20(${username})`,
    auth: {
      username,
      password
    }
  })
  .then(response => {
    obj.setState({
      progress: false,
      isLogged: true,
      visible: false,
      data: response.data.issues
    });
  })
  .catch(error => {
    let status = error.response.status === 401 ? 'Incorrect data' : '';
    obj.setState({
      errorText: `${status}`,
      progress: false,
      visible: false
    });
  });
}
