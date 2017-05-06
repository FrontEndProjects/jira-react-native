import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import secondsToTime from '../../helpers/secondsToTime';

const TaskInfo = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>Today logged time: {secondsToTime(props.minutes * 60, false)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    fontSize: 15
  },
  button: {
    justifyContent: 'flex-end'
  }

});

export default TaskInfo;
