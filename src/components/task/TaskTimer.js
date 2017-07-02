import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';
import secondsToTime from '../../helpers/secondsToTime';

import strings from '../../language/strings';
import getStorage from '../../storage/getStorage';

export default class TaskTimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      timerId: null,
      isTicking: false,
      check: 0,
      startDisabled: false,
      stopDisabled: true
    };
  }

  componentDidMount() {
    const d = new Date();
    const timeStamp = d.getTime();
    if (!this.state.isFirstTime) {
      getStorage()
        .getBatchData([
            { key: 'intervalStart' },
            { key: 'intervalStop' }
        ])
        .then(data => {
          if (data[0].start === 0) {
            this.setState({
              seconds: 0,
              isFirstTime: false
            });
          } else if (data[1].stop) {
            this.setState({
              seconds: Math.round((data[1].stop - data[0].start) / 1000),
              isFirstTime: false
            });
          } else {
            this.setState({
              seconds: Math.round((timeStamp - data[0].start) / 1000),
              isFirstTime: false
            });
          }
          if (data.isTicking) {
            this.setState({
              isTicking: true
            });
            clearInterval(this.state.interval);
            const interval = setInterval(this.tick, 1000);
            this.setState({
              interval
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  timerStart() {
    const d = new Date();
    const timeStamp = d.getTime();
    const interval = setInterval(this.tick, 1000);
    getStorage()
      .save({
        key: 'intervalStart',
        rawData: {
          start: timeStamp - this.state.seconds * 1000,
          isTicking: true
        }
      });
    this.setState({
      start: timeStamp,
      interval,
      startDisabled: true,
      stopDisabled: false
    });
    getStorage()
      .save({
        key: 'intervalStop',
        rawData: {
          stop: 0
        }
      });
  }

  timerStop() {
    const d = new Date();
    const timeStamp = d.getTime();
    getStorage()
      .save({
        key: 'intervalStart',
        rawData: {
          start: timeStamp - this.state.seconds * 1000,
          isTicking: false
        }
      });
    getStorage()
      .save({
        key: 'intervalStop',
        rawData: {
          stop: timeStamp
        }
      });
    this.setState({
      stop: timeStamp,
      startDisabled: false,
      stopDisabled: true
    });
    clearInterval(this.state.interval);
  }

  timerReset() {
    this.timerStop();
    this.setState({
      seconds: 0,
      startDisabled: false,
      stopDisabled: true
    });
    getStorage()
      .save({
        key: 'intervalStart',
        rawData: {
          start: 0,
          isTicking: false
        }
      });
  }

  tick = () => {
    this.setState({
      seconds: this.state.seconds + 1
    });
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Button disabled={this.state.startDisabled} onPress={() => { this.timerStart(); }} ><Text>{strings.start}</Text></Button>
          <Button disabled={this.state.stopDisabled} onPress={() => { this.timerStop(); }}><Text>{strings.stop}</Text></Button>
          <Button onPress={() => { this.timerReset(); }}><Text>{strings.reset}</Text></Button>
        </View>
      <View style={{ flex: 1, alignSelf: 'stretch', minWidth: 340 }}>
        <Text>{secondsToTime(this.state.seconds)}</Text>
        <Text>{this.state.seconds}</Text>
      </View>
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
