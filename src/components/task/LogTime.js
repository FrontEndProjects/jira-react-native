import React from 'react';
import { ActivityIndicator } from 'react-native';

import strings from '../../language/strings';

import {Item, Button, Input, Text, Form} from 'native-base';

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
        <Input keyboardType='numeric' placeholder={strings.enter_minutes_to_log}
               onChangeText={props.handleInput} style={{marginTop: 5, fontSize: 14, paddingBottom: 0}}/>
      </Item>
      {logHours}
    </Form>
  );
};

export default LogTime;

