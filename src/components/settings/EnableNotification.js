import React, { Component } from 'react';

import { View } from 'react-native';

import { CheckBox } from 'native-base';

import Notification from '../../notifications/Notification';

import getStorage from '../../storage/getStorage';

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
    getStorage().load({
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
            this.props.myFunc();
            getStorage().save({
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
