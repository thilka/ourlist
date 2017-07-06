import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';




export default class ProjectList extends Component {

  onPress = () => {}

  renderItem = ({item, index}) => {
    return (
      <TouchableHighlight style={[ styles.item, { borderTopWidth: index === 0 ? 1 : null} ]} onPress={this.onPress}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableHighlight>
    )
  }

  

  render() {
    return (
      <FlatList 
        data={projects} 
        keyExtractor={(item) => item.name} 
        renderItem={this.renderItem} />
    )
  }
}

const projects = [
  {name: 'FirstItem'},
  {name: 'SecondItem'},
];

const styles = StyleSheet.create({
  item: {
    padding: 20,
    justifyContent: 'center',
    borderColor: 'black',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 18
  }
});