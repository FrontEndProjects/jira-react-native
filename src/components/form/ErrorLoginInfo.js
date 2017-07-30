import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import strings from '../../language/strings';

const TaskMoreInfo = () => (
  <View style={styles.container}>
    <Text style={styles.text}>{strings.login_error}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    color: '#E60010'
  }
});

export default TaskMoreInfo;
