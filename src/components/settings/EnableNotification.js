import React, {Component} from 'react';

import { View, Switch } from 'react-native';

import Notification from '../../notifications/Notification';

import getStorage from '../../storage/getStorage';

export default class EnableNotification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switchOn: false
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    getStorage().load({
      key: 'switchNotificationOn'
    })
    .then(data => { this.state = { switchOn: data.enable }; })
    .catch(() => { this.state = { switchOn: false }; });
  }

  render() {
    return (
      <View>
        <Switch
          onValueChange={value => {
            this.setState({switchOn: value});
            this.props.switch();
            getStorage().save({
              key: 'switchNotificationOn',
              rawData: {
                enable: !this.state.switchOn
              }
            });
          }}
          value={this.state.switchOn}
        />
        <Notification
          timing={this.state.switchOn}
          cancel={!this.state.switchOn}
        />
      </View>
    );
  }
}
