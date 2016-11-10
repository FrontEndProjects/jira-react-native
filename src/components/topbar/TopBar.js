import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TopBar extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <View>
        <Text>You already have worked for: {this.props.allTimeLogged} minutes</Text>
        <View style={{flexDirection: 'row', backgroundColor: 'skyblue', height: 5, margin: 20}} >
          <View style={{flex: 0.8, backgroundColor: 'green', height: 3}} />
        </View>
      </View>
    );
  }

}
