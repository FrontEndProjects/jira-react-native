import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'steelblue', 
    padding: 2,
    height: 5,
    marginTop: 8,
    marginBottom: 8,
  },
  rest: {
    backgroundColor: 'grey', 
    padding: 2,
    height: 5,
    marginTop: 8,
    marginBottom: 8,
  }

})

export default class TopBar extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    let timeInPercent = this.props.allTimeLogged / 360;
    return (
      <View >
        <Text>You already have worked for: {this.props.allTimeLogged} minutes</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={[ styles.bar, {flex: timeInPercent} ]} />
          <View style={[ styles.rest, {flex: 1 - timeInPercent} ]} />
        </View>
      </View>
    );
  }

}
