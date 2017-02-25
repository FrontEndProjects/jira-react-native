import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TopBar = (props) => {
  let timeInPercent = props.allTimeLogged / 360;
  return (
    <View>
      <Text style={styles.text}>Today you have logged: {props.allTimeLogged} minutes</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={[styles.bar, {flex: timeInPercent}]}/>
        <View style={[styles.rest, {flex: 1 - timeInPercent}]}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingLeft: 10,
    paddingTop: 5
  },
  bar: {
    backgroundColor: 'steelblue',
    padding: 2,
    height: 5,
    marginTop: 8,
    marginBottom: 8
  },
  rest: {
    backgroundColor: 'grey',
    padding: 2,
    height: 5,
    marginTop: 8,
    marginBottom: 8
  }
});

export default TopBar;

