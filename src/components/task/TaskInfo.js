import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Button} from 'native-base';

function TaskInfo(props) {
  return (
      <View style={styles.container} >
        <Text style={styles.text}>{props.minutes} minutes worked today</Text>
        <Button title="Go to Jira" style={styles.button} bordered small onPress={props.handleLinkClick} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    flex: 0.7
  },
  button: {
    justifyContent: 'flex-end'
  }

});

export default TaskInfo;

