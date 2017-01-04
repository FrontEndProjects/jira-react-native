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

  compareTimes(currentTime, setTime) {
    let currentStateTimestamp = this.convertToTimestamp(setTime); // 19:40
    if (currentTime > currentStateTimestamp) {
      return moment(currentStateTimestamp, 'x').add(1, 'days').format('x');
    } else {
      return currentStateTimestamp;
    }
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
              this.setState({
                time,
                timeChanged: true
              });
              let timestamp = this.compareTimes(new Date().getTime(), this.state.time);
              storage.save({
                key: 'notification',
                rawData: {
                  timestamp,
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