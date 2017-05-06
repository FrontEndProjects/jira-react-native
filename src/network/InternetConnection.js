import React, { Component } from 'react';
import { NetInfo, Text, View, Animated } from 'react-native';

export default class InternetConnection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isConnect: null,
      connectText: '',
      fadeAnim: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.checkInternet();
    this.animateTiming();
  }

  animateTiming = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 1500,
        delay: 2500
      }
    ).start();
  };

  handleFirstConnectivityChange = (isConnected) => {
    this.setState({
      connectText: isConnected ? 'You are connected to the Internet' : 'Offline, check your Internet connection',
      connect: isConnected,
      fadeAnim: new Animated.Value(1)
    });
    this.animateTiming();
  };

  checkInternet () {
    NetInfo.isConnected.addEventListener(
      'change',
      this.handleFirstConnectivityChange
    );
  }

  render() {
    if (this.state.connect) {
      return (
        <Animated.View style={[ styles.wrapper, styles.wrapperSuccess, {opacity: this.state.fadeAnim} ]}>
          <Text style={styles.text}>
            {this.state.connectText}
          </Text>
        </Animated.View>
      );
    } else {
      return (
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            {this.state.connectText}
          </Text>
        </View>
      );
    }
  }
}

const styles = {
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#d50000'
  },
  wrapperSuccess: {
    backgroundColor: '#4caf50'
  },
  text: {
    paddingTop: 4,
    paddingBottom: 8,
    color: '#e9e9e9',
    fontSize: 16
  }
};
