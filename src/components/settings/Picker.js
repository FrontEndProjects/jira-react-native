import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import {View} from 'react-native';
import Notification from '../../notifications/Notification';

import moment from 'moment';

import getStorage from '../../storage/getStorage';

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
    getStorage().load({
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
      // let timestamp = this.compareTimes(new Date().getTime(), '17:00');
      getStorage().save({
        key: 'notification',
        rawData: {
          timestamp: this.convertToTimestamp('17:00'),
          humanTime: '17:00'
        }
      });
      this.state = {
        time: '17:00'
      };
    });
  }

  convertToTimestamp(time) {
    return moment(time, 'HH:mm').format('x');
  }

  compareTimes(currentTime, setTime) {
    console.log('current time' + currentTime + ' set time' + setTime);
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
            disabled={this.props.disabled}
            onDateChange={(time) => {
              this.setState({
                time,
                timeChanged: true
              });
              getStorage().save({
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
