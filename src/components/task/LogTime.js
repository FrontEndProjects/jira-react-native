import React from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';

import strings from '../../language/strings';

import {Item, Button, Text, Form} from 'native-base';

const LogTime = (props) => {
  let logHours = null;
  if (props.logging === false) {
    logHours = <Button style={{marginLeft: 'auto', marginTop: 20}} disabled={props.disabledButton} onPress={props.handlePostClick}><Text>{strings.log_time}</Text></Button>;
  } else {
    logHours = <ActivityIndicator/>;
  }
  return (
    <Form style={{flex: 0.75}}>
      <Item style={{marginLeft: 0}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', width: 150, height: 30}}>
          <TextInput keyboardType='numeric'
                     placeholder={strings.hours}
                     underlineColorAndroid='transparent'
                     onChangeText={props.handleInputHours}
                     style={{width: 70, marginTop: 5, fontSize: 14, paddingBottom: 0, borderRightColor: 'gray', borderRightWidth: 1, textAlign: 'center'}}/>
          <TextInput keyboardType='numeric'
                     placeholder={strings.minutes}
                     underlineColorAndroid='transparent'
                     onChangeText={props.handleInputMinutes}
                     style={{width: 70, marginTop: 5, fontSize: 14, paddingBottom: 0, paddingLeft: 15, textAlign: 'center'}}/>
        </View>
      </Item>
      {logHours}
    </Form>
  );
};

export default LogTime;

