import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

import { StyleSheet } from 'react-native';
import Picker from '../components/settings/Picker';
import EnableNotification from '../components/settings/EnableNotification';

export default class SettingsContainer extends Component {
  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Text style={styles.text}>Enable notifications</Text>
          <EnableNotification />
          <Text style={styles.text}>Notification time</Text>
          <Picker />
          <Text style={styles.text}>Interval</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 16,
    paddingRight: 16
  },
  text: {
    color: '#009688',
    paddingBottom: 12,
    paddingTop: 16
  }
});
