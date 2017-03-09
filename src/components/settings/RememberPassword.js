import React, {Component} from 'react';

import {Switch, View} from 'react-native';

import getStorage from '../../storage/getStorage';

export default class RememberPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switchOn: false
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    getStorage().load({
      key: 'rememberPass'
    })
    .then(data => { this.state = { switchOn: data.enable }; })
    .catch(() => { this.state = { switchOn: false }; });
  }

  render() {
    return (
      <View>
        <Switch
          onValueChange={value => {
            this.setState({switchOn: value});
            this.props.switch();
            getStorage().save({
              key: 'rememberPass',
              rawData: {
                enable: !this.state.switchOn
              }
            });
          }}
          value={this.state.switchOn}
        />
      </View>
    );
  }
}
