import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import secondsToTime from '../../helpers/secondsToTime';
import LinearGradient from 'react-native-linear-gradient';

import strings from '../../language/strings';

const TopBar = (props) => {
  let timeInPercent = props.allTimeLogged / 360;
  return (
    <View>
      <Text style={styles.text}>{strings.today_you_have_logged}: {secondsToTime(props.allTimeLogged * 60, false)}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <LinearGradient colors={['#3a7bd5', '#3a6073']} start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style={[styles.bar, {flex: timeInPercent}]} />
        <View style={[styles.rest, {flex: 1 - timeInPercent}]}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingTop: 8,
    fontSize: 16,
    textAlign: 'center'
  },
  bar: {
    backgroundColor: '#283593',
    padding: 0,
    height: 10,
    marginTop: 8,
    marginBottom: 8
  },
  rest: {
    backgroundColor: '#b4b4b4',
    height: 10,
    marginTop: 8,
    marginBottom: 8
  }
});

export default TopBar;

