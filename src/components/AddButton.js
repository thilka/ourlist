import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';

import { Icon } from 'react-native-elements'


export default class AddButton extends Component {

  render() {
    const {onPress} = this.props
    return (
      <View style={styles.addButton}>
        <Icon name='add' color={Platform.OS==="ios" ? '#177efb' : 'black'} onPress={onPress}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addButton: {
    padding: 10,
  },
});