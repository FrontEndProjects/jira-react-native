import axios from 'axios';
import getUserInfo from './getUserInfo';
import getIssues from './getIssues';

export default (username, password, jiraLink, obj) => (
  axios({
    url: `${jiraLink}/rest/auth/1/session`,
    auth: {
      username,
      password
    }
  })
  .then(response => {
    console.log(response);
    if ((response.headers['x-seraph-loginreason']) === 'OK' && (response.status === 200)) {
      obj.setState({
        progress: true,
        visible: true,
        authError: false
      });
      getUserInfo(username, password, jiraLink, obj);
      getIssues(username, password, jiraLink, obj);
    } else {
      obj.setState({
        authError: true
      });
    }
  })
  .catch(error => {
    console.log(error);
    obj.setState({
      authError: true
    });
  })
);

