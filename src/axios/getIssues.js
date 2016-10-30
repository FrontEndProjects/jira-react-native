import axios from 'axios';

export default function (username, password, obj) {
  return axios({
    url: `https://jira.nitro-digital.com/rest/api/2/search?jql=status%20in%20(Open%2C%20%22In%20Progress%22)%20AND%20assignee%20in%20(${username})`,
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
