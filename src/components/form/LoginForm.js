import React, {Component} from 'react';

import {Content, InputGroup, Input, Button} from 'native-base';

import FCM from 'react-native-fcm';

export default class LoginForm extends Component {

  componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log('Token ', token)
      // store fcm token in your server
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      if (notif.local_notification) {
        //this is a local notification
      }
      if (notif.opened_from_tray) {
        //app is open/resumed because user clicked banner
      }
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    });
  }

    componentWillUnmount() {
      // prevent leaking
      this.refreshUnsubscribe();
      this.notificationUnsubscribe();
    }

    otherMethods(){
      FCM.subscribeToTopic('/topics/foo-bar');
      FCM.unsubscribeFromTopic('/topics/foo-bar');
      FCM.getInitialNotification().then(notif=>console.log(notif));
      FCM.presentLocalNotification({
        id: "UNIQ_ID_STRING",                               // (optional for instant notification)
        title: "My Notification Title",                     // as FCM payload
        body: "My Notification Message",                    // as FCM payload (required)
        sound: "default",                                   // as FCM payload
        priority: "high",                                   // as FCM payload
        click_action: "ACTION",                             // as FCM payload
        badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
        number: 10,                                         // Android only
        ticker: "My Notification Ticker",                   // Android only
        auto_cancel: true,                                  // Android only (default true)
        large_icon: "ic_launcher",                           // Android only
        icon: "ic_notification",                            // as FCM payload
        big_text: "Show when notification is expanded",     // Android only
        sub_text: "This is a subText",                      // Android only
        color: "red",                                       // Android only
        vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
        tag: 'some_tag',                                    // Android only
        group: "group",                                     // Android only
        my_custom_data:'my_custom_field_value',             // extra data you want to throw
        lights: true,                                       // Android only, LED blinking (default false)
        show_in_foreground                                  // notification when app is in foreground (local & remote)
      });

      FCM.scheduleLocalNotification({
        fire_date: new Date().getTime(),      //RN's converter is used, accept epoch time and whatever that converter supports
        id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
        body: "from future past",
        repeat_interval: "week" //day, hour
      })

      FCM.getScheduledLocalNotifications().then(notif=>console.log(notif));
      FCM.cancelLocalNotification("UNIQ_ID_STRING");
      FCM.cancelAllLocalNotifications();
      FCM.setBadgeNumber();
      FCM.getBadgeNumber().then(number=>console.log(number));
      FCM.send('22XXXXXXXXX', {
        my_custom_data_1: 'my_custom_field_value_1',
        my_custom_data_2: 'my_custom_field_value_2'
      });
    }


  render () {
    return (
      <Content>
        <InputGroup>
          <Input
            placeholder="Enter your login"
            onChangeText={this.props.handleLoginInput}
          />
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={this.props.handlePasswordInput}
          />
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="Enter your link"
            onChangeText={this.props.handleLoginInput}
          />
        </InputGroup>
        <Button block primary onPress={this.props.handleLoginButton}>Login</Button>
      </Content>
    );
  }
}
