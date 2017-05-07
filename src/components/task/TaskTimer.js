import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';
import BackgroundTimer from 'react-native-background-timer';
import secondsToTime from '../../helpers/secondsToTime';

import strings from '../../language/strings';

export default class TaskTimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      timerId: null,
      startDisabled: false,
      stopDisabled: true
    };
  }

  timerStart() {
    const timerId = BackgroundTimer.setInterval(() => {
      this.tick();
    }, 1000);

    this.setState({
      timerId,
      startDisabled: true,
      stopDisabled: false
    });
  }

  timerStop() {
    BackgroundTimer.clearTimeout(this.state.timerId);
    this.setState({
      startDisabled: false,
      stopDisabled: true
    });
  }

  timerReset() {
    this.timerStop();
    this.setState({
      seconds: 0,
      startDisabled: false,
      stopDisabled: true
    });
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button disabled={this.state.startDisabled} onPress={() => { this.timerStart(); }} ><Text>{strings.start}</Text></Button>
        <Button disabled={this.state.stopDisabled} onPress={() => { this.timerStop(); }}><Text>{strings.stop}</Text></Button>
        <Button onPress={() => { this.timerReset(); }}><Text>{strings.reset}</Text></Button>
        <Text>{secondsToTime(this.state.seconds)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

