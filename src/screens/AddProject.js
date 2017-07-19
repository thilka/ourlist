import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert, 
  View,
  TextInput,
  Button
} from 'react-native';

import { Icon } from 'react-native-elements'

const items = [
  {name: 'Item 1'},
  {name: 'Item 2'},
];

export default class AddProject extends Component {

  static navigationOptions = ({navigation}) => {
    // make sure the disabled property of the done button is handled without race condition
    // if we refer to a property from the class, the button is initially enabled for a short time
    currentText = navigation.state.params.text ? navigation.state.params.text : ''

    return ({
      headerTitle: 'Create',
      headerAlignment: 'center',
      headerStyle: { backgroundColor: '#58a2fb'},
      headerTintColor: 'black',
      headerRight:(
        <View style={{padding: 5}}>
          <Button title='Done' onPress={() => navigation.state.params.handleSave()} 
            disabled={currentText <= 0}/>
        </View>)
    })
  }

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentWillMount() {
    saveCallback = () => this.onSave()
    this.props.navigation.setParams({ handleSave: saveCallback, text:''});
  }

  onSave() {
    this.props.navigation.state.params.saveProjectDetailsCallback(this.state.text)
  }

  onChangeText = (text) => {    
    this.props.navigation.setParams({text:text});
    this.setState({text})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Name' editable={true} autoFocus={true}
          onChangeText={this.onChangeText}
          value={this.state.text}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 16,
    justifyContent: 'center',
    margin:2,
    backgroundColor: 'white'
  },
  container: {
    paddingTop: 10,
  },
});