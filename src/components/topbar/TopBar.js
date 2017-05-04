import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import secondsToTime from '../../helpers/secondsToTime';

const TopBar = (props) => {
  let timeInPercent = props.allTimeLogged / 360;
  return (
    <View>
      <Text style={styles.text}>Today you have logged: {secondsToTime(props.allTimeLogged * 60, false)}</Text>
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
    height: 8,
    marginTop: 8,
    marginBottom: 8
  },
  rest: {
    backgroundColor: 'grey',
    height: 8,
    marginTop: 8,
    marginBottom: 8
  }
});

export default TopBar;

