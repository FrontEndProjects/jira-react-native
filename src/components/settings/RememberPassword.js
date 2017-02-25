import React, {Component} from 'react';

import {Switch, View} from 'react-native';

export default class RememberPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switchOn: false
    };
  }

  render() {
    return (
      <View>
        <Switch
          onValueChange={(value) => this.setState({switchOn: value})}
          value={this.state.switchOn}
        />
      </View>
    );
  }
}
