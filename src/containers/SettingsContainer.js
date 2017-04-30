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
      switchNotificationOn: false,
      rememberPass: false
    };

    this.handleNotificationSwitch = this.handleNotificationSwitch.bind(this);
    this.handlePassSwitch = this.handlePassSwitch.bind(this);
  }

  componentDidMount() {
    this.checkNotificationIsEnable();
    this.checkRememberPassword();
  }

  checkNotificationIsEnable() {
    getStorage().load({
      key: 'switchNotificationOn'
    })
    .then(data => { this.setState({ switchNotificationOn: data.enable }); })
    .catch(() => { this.setState({ switchNotificationOn: false }); });
  }

  checkRememberPassword() {
    getStorage().load({
      key: 'rememberPass'
    })
    .then(data => { this.setState({ rememberPass: data.enablePass }); })
    .catch(() => { this.setState({ rememberPass: false }); });
  }

  handleNotificationSwitch = () => {
    this.setState({
      switchNotificationOn: !this.state.switchNotificationOn
    });
  };

  handlePassSwitch = () => {
    this.setState({
      rememberPass: !this.state.rememberPass
    });
  };

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <View style={styles.settingSection}>
            <Text style={styles.text}>Enable notifications</Text>
            <EnableNotification style={styles.checkBox} switch={this.handleNotificationSwitch} />
          </View>
          <View style={styles.settingSection}>
            <Text style={styles.text}>Notification time</Text>
              <Picker disabled={!this.state.switchNotificationOn} />
          </View>
          <View style={styles.settingSection}>
            <Text style={styles.text}>Remember my password</Text>
            <RememberPassword style={styles.checkBox} switch={this.handlePassSwitch} />
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
