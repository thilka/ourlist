import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

import Swipeout from 'react-native-swipeout'

export default class ProjectItem extends Component {

  render() {
    const {onPress, item, itemSelected, onDelete} = this.props

    buttons = [
      {
        text: 'Delete',
        onPress: (item) => onDelete(item),
        type: 'delete'
      }
    ]

    return (
      <Swipeout 
          rowID={item.id} 
          onOpen={(sid, rid, direction) => itemSelected(sid, rid, direction)} 
          right={buttons} 
          backgroundcolor='white' 
          style={styles.swipes}>
        <TouchableHighlight 
            underlayColor='lightgrey' 
            style={styles.item} 
            onPress={() => onPress(item)}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableHighlight>
      </Swipeout>
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
  swipes: {
    backgroundColor: 'transparent'
  },
});