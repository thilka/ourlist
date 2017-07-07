import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';


const projects = [
  {name: 'Project 1'},
  {name: 'Project 2'},
];

export default class ProjectList extends Component {

  onPress = (item) => {
    const { navigate } = this.props.navigation
    navigate("Details", {item: item})
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableHighlight underlayColor='lightgrey' style={[ styles.item, { borderTopWidth: index === 0 ? 1 : null} ]} onPress={() => this.onPress(item)}>
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

const styles = StyleSheet.create({
  item: {
    flex:1,
    padding: 20,
    justifyContent: 'center',
    borderColor: 'black',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 18,
    alignSelf: 'center'
  }
});