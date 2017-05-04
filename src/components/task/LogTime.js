import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {InputGroup, Button, Input} from 'native-base';

const LogTime = (props) => {
  let logHours = null;
  if (props.logging === false) {
    logHours = <Button disabled={props.disabledButton} style={styles.half} block onPress={props.handlePostClick}>Log time</Button>;
  } else {
    logHours = <ActivityIndicator style={styles.half}/>;
  }
  return (
    <View style={styles.container}>
      <InputGroup style={styles.half} borderType='rounded'>
        <Input keyboardType='numeric' placeholder='Minutes to log'
               onChangeText={props.handleInput}/>
      </InputGroup>
      {logHours}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  half: {
    flex: 0.5,
    margin: 10
  }

});

export default LogTime;

