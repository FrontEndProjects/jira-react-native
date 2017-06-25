import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'native-base';
import strings from '../../language/strings';
import secondsToTime from '../../helpers/secondsToTime';

const TaskMoreInfo = (props) => (
    <View>
      <View style={styles.divider}/>
      <View>
        <Text style={styles.cardSubtitleInfo}>{strings.total_logged_time}:</Text>
        <Text style={styles.cardTitleInfo}>{secondsToTime(props.taskTimeSpent, false)}</Text>
      </View>
      <View>
        <Text style={styles.cardSubtitleInfo}>{strings.task}</Text>
        <Text style={styles.cardTitleInfo}>{props.link}</Text>
      </View>
      <View>
        <Text style={styles.cardSubtitleInfo}>{strings.status}</Text>
        <Text style={styles.cardTitleInfo}>{props.status}</Text>
      </View>
      <View>
        <Text style={styles.cardSubtitleInfo}>{strings.reporter}</Text>
        <Text style={styles.cardTitleInfo}>{props.reporter}</Text>
        <Text style={styles.cardTitleInfo}>{props.reporterEmail}</Text>
      </View>
      <View>
        <Text style={styles.cardSubtitleInfo}>{strings.description}</Text>
        <Text style={styles.cardTitleInfo}>{props.description}</Text>
      </View>
      <View style={styles.divider}/>
        <View>
          <Button transparent small onPress={props.handleLinkClick}><Text>{strings.go_to_jira}</Text></Button>
        </View>
      <View style={styles.divider}/>
    </View>
);

const styles = {
  cardTitleInfo: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 15
  },
  cardSubtitle: {
    paddingBottom: 16,
    fontSize: 12,
    color: '#cccccc'
  },
  cardSubtitleInfo: {
    paddingBottom: 0,
    paddingTop: 4,
    fontSize: 12,
    color: '#cccccc'
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 16,
    marginBottom: 16
  }
};

export default TaskMoreInfo;
