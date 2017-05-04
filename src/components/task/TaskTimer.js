import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import BackgroundTimer from 'react-native-background-timer';
import secondsToTime from '../../helpers/secondsToTime';

export default class TaskTimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      timerId: null
    };
  }

  timer() {
    const timerId = BackgroundTimer.setInterval(() => {
      this.tick();
    }, 1000);

    this.setState({timerId});
  }

  timerStop() {
    BackgroundTimer.clearTimeout(this.state.timerId);
  }

  timerReset() {
    this.timerStop();
    this.setState({
      seconds: 0
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
        <Button onPress={() => { this.timer(); }}>Start</Button>
        <Button onPress={() => { this.timerStop(); }}>Stop</Button>
        <Button onPress={() => { this.timerReset(); }}>Reset</Button>
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

