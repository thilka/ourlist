import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import Swipeout from 'react-native-swipeout'
import {Button } from 'react-native-elements'

export default class DetailItem extends Component {

  render() {
    const {onPress, item, itemSwiped, onDelete, wasLastSelected} = this.props

    buttons = [
      {
        text: 'Delete',
        onPress: () => onDelete(),
        type: 'delete'
      }
    ]
    // console.log(itemSwipedeitemSwipedeed)
    doneIconColor = item.done ? 'green' : 'grey'
    backgroundColor = item.done ? 'lightgreen' : 'white'

    return (
      <Swipeout 
          rowID={item.id} 
          close={!wasLastSelected}
          autoClose={true}
          onOpen={(sid, rid, direction) => itemSwiped(sid, rid, direction)} 
          right={buttons} 
          backgroundcolor='white' 
          style={styles.swipes}>
         <View style={styles.row}>
            <Button icon={{name:'check-circle', color:doneIconColor, size:20}}
              title={item.name} backgroundColor={backgroundColor} color='black' underlayColor='lightgrey'
              buttonStyle={{flexDirection: 'row'}} 
              onPress={() => onPress(item)}/>
            {/*<TextInput style={styles.input} placeholder='Name' editable={false} autoFocus={true}
            onChangeText={this.onChangeText}
            value={item.name}/>*/}
          </View>
       </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    // flexDirection: 'row',
    flex: 1,
    // padding: 2,
    // alignContent: 'flex-start',
    // alignSelf: 'center'
  },
  swipes: {
    backgroundColor: 'transparent'
  },
});