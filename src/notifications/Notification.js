import React, {Component} from 'react';
import FCM from 'react-native-fcm';

export default class Notification extends Component {

  componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log('Token ', token);
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      console.log('notif', notif);
      if (notif.local_notification) {
        console.log('local notification');
      }
      if (notif.opened_from_tray) {
        console.log('opened from tray');
      }
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      console.log(token);
    });

    FCM.scheduleLocalNotification({
      fire_date: new Date().getTime() + 10000,
      id: 'user_notification1',
      body: 'test',
      title: 'test',
      color: 'red',
      show_in_foreground: true
    });
  }

  componentWillUnmount() {
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }

  render() {
    return null;
  }
}
