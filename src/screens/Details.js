import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert, 
  View
} from 'react-native';

import { CheckBox } from 'react-native-elements'

const items = [
  {name: 'Item 1'},
  {name: 'Item 2'},
];

export default class Details extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.item.name,
    headerStyle: { backgroundColor: '#58a2fb'},
    headerTintColor: 'black',
  })

  renderItem = ({item, index}) => {
    return (
      <View style={styles.row}>
        <CheckBox style={styles.checkbox} textStyle={styles.text} title={item.name}/>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.detailsPane}>
        <FlatList 
          data={items} 
          keyExtractor={(item) => item.name} 
          renderItem={this.renderItem} />
      </View>
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
    alignSelf: 'center',
    fontSize:15
  },
  checkbox: {
    // to override default style
  },
  row: {
    flexDirection: 'row',
    padding: 5
  },
  detailsPane: {
    backgroundColor: 'white',
    flex:1
  }
  

});