import React, { Component } from 'react';

import { AsyncStorage, View } from 'react-native';
import Storage from 'react-native-storage';

import { CheckBox } from 'native-base';

import Notification from '../../notifications/Notification';

export default class EnableNotification extends Component {

  constructor (props) {
    super(props);
    this.state = {
      checkbox: false
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    storage.load({
      key: 'notificationEnable'
    }).then(data => {
      console.log(data);
      this.state = {
        checkbox: data.enable
      };
    }).catch(error => {
      console.log('Error: ', error);
      this.state = {
        checkbox: false
      };
    });
  }

  render() {
    return (
      <View>
        <CheckBox
          checked={this.state.checkbox}
          onPress={() => {
            this.setState({checkbox: !this.state.checkbox});
            storage.save({
              key: 'notificationEnable',
              rawData: {
                enable: !this.state.checkbox
              }
            });
          }}
        />
        <Notification
          timing={this.state.checkbox}
          cancel={!this.state.checkbox}
        />
        </View>
    );
  }
}

const storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: false
});
