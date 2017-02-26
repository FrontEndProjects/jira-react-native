import {Component} from 'react';
import FCM, { FCMEvent } from 'react-native-fcm';

import getStorage from '../storage/getStorage';

import moment from 'moment';

export default class Notification extends Component {

  compareTimes(currentTime, currentStateTimestamp) {
    if (currentTime > currentStateTimestamp) {
      return moment(currentStateTimestamp, 'x').add(1, 'days').format('x');
    } else {
      return currentStateTimestamp;
    }
  }

  componentDidUpdate() {
    getStorage().load({
      key: 'notification'
    }).then(data => {
      if (this.props.timing) {
        console.log(new Date().getTime());
        console.log(Number(data.timestamp));
        let timestamp = this.compareTimes(new Date().getTime(), Number(data.timestamp));
        console.log('Timestamp: ', timestamp);
        FCM.scheduleLocalNotification({
          fire_date: Number(timestamp),
          id: 'user_notification1',
          body: 'test',
          title: 'green',
          color: 'red',
          // repeat_interval: 'minute',
          show_in_foreground: true
        });

        FCM.getScheduledLocalNotifications().then(notify => {
          console.log(notify);
          let a = new Date(notify[0].fire_date);
          console.log(a);
        });
      }
    }).catch(err => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          break;
        case 'ExpiredError':
          break;
      }
    });

    if (this.props.cancel) {
      FCM.cancelLocalNotification('user_notification1');
    }

    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log('Token ', token);
    });
    this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, (notif) => {
      if (notif.local_notification) {
        console.log('local notification');
      }
      if (notif.opened_from_tray) {
        console.log('opened from tray');
      }
    });
    this.refreshUnsubscribe = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log(token);
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
