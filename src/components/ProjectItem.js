import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

export default class ProjectItem extends Component {

  render() {
    const {onPress, item} = this.props
    return (
      <TouchableHighlight underlayColor='lightgrey' style={styles.item} onPress={() => onPress(item)}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex:1,
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    alignSelf: 'center'
  },

});