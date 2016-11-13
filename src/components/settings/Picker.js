import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import {AsyncStorage, View} from 'react-native';
import Storage from 'react-native-storage';
import Notification from '../../notifications/Notification';

import moment from 'moment';

export default class Picker extends Component {

  componentDidUpdate() {
    this.loadData();
  }

  componentWillMount() {
    this.state = {
      loading: true
    };
    this.loadData();
  }

  loadData() {
    storage.load({
      key: 'notification'
    }).then(data => {
      console.log(data);
      this.state = {
        time: data.humanTime,
        timeChanged: false,
        loading: false
      };
    }).catch(error => {
      console.log('Error: ', error);
      this.state = {
        time: '17:00'
      };
    });
  }

  convertToTimestamp(time) {
    return moment(time, 'HH:mm').format('x');
  }

  render() {
    if (this.state.loading) {
      return null;
    } else {
      return (
        <View>
          <DatePicker
            style={{width: 200}}
            date={this.state.time}
            mode="time"
            format="HH:mm"
            minuteInterval={10}
            onDateChange={(time) => {
              console.log(time);
              this.setState({
                time,
                timeChanged: true
              });
              storage.save({
                key: 'notification',
                rawData: {
                  timestamp: this.convertToTimestamp(this.state.time),
                  humanTime: this.state.time
                }
              });
            }}
          />
          <Notification timing={this.state.timeChanged}/>
        </View>
      );
    }
  }
}

const storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: false
});
