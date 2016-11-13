import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

import { StyleSheet } from 'react-native';
import Picker from '../picker/Picker';

export default class SettingsContainer extends Component {
  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Text style={styles.text}>Choose notification time</Text>
          <Picker />
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
    paddingBottom: 16,
    paddingTop: 8
  }
});
