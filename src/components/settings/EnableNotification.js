import React, { Component } from 'react';

import { View } from 'react-native';

import { CheckBox } from 'native-base';

import Notification from '../../notifications/Notification';

export default class EnableNotification extends Component {

  constructor (props) {
    super(props);
    this.state = {
      checkbox: false
    };
  }

  render() {
    return (
      <View>
        <CheckBox
          checked={this.state.checkbox}
          onPress={() => this.setState({checkbox: !this.state.checkbox})}
        />
        <Notification
          timing={this.state.checkbox}
          cancel={!this.state.checkbox}
        />
        </View>
    );
  }
}
