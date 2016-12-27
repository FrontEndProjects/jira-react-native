import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {InputGroup, Button, Input} from 'native-base';

export default class LoginForm extends Component {

  render () {
    let logHours = null;
    if (this.props.logging === false) {
      logHours = <Button style={styles.half} block onPress={this.props.handlePostClick}>Log time</Button>;
    } else {
      logHours = <ActivityIndicator style={styles.half} />;
    }
    return (
      <View style={styles.container}>
        <InputGroup style={styles.half} borderType='rounded' >
          <Input keyboardType='numeric' placeholder='Number of minutes to log' value={this.props.timeToLog} onChangeText={this.props.handleInput} />
          </InputGroup>
          {logHours}
      </View>
    );
  }
}

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
