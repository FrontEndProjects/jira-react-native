import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

import { StyleSheet, View } from 'react-native';
import Picker from '../components/settings/Picker';
import EnableNotification from '../components/settings/EnableNotification';
import RememberPassword from '../components/settings/RememberPassword';

import getStorage from '../storage/getStorage';

export default class SettingsContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showPicker: false
    };

    this.handleClick = this.handleClick.bind(this);

    this.check();
  }

  check() {
    getStorage().load({
      key: 'notificationEnable'
    }).then(data => {
      console.log(data);
      this.state = {
        showPicker: data.enable
      };
    }).catch(error => {
      console.log('Error: ', error);
      this.state = {
        showPicker: false
      };
    });
  }

  handleClick = () => {
    console.log('1', this.state.showPicker);
    this.setState({
      showPicker: !this.state.showPicker
    });
  };

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <View style={styles.settingSection}>
            <Text style={styles.text}>Enable notifications</Text>
            <EnableNotification style={styles.checkBox} myFunc={this.handleClick} />
          </View>
          <View style={styles.settingSection}>
            <Text style={styles.text}>Notification time</Text>
              <Picker disabled2={this.state.showPicker} />
          </View>
          <View style={styles.settingSection}>
            <Text style={styles.text}>Remember my password</Text>
            <RememberPassword style={styles.checkBox} />
          </View>
          <Text style={styles.smallText}>Warning! This could be dangerous. Your password will be stored in plain text in local database. This setting is not reccomended unless you know what you are doing.</Text>
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
  settingSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: '#009688',
    flex: 0.5,
    paddingBottom: 12,
    paddingTop: 16
  },
  checkBox: {
    flex: 0.5
  },
  smallText: {
    fontSize: 10,
    lineHeight: 12,
    color: 'red'
  }
});
