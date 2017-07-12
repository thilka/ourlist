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

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Create',
    headerAlignment: 'center',
    headerRight:(
      <View style={{padding: 5}}>
        <Button title='Done' onPress={() => navigation.state.params.handleSave()}/>
      </View>)

  })

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount() {
    saveCallback = () => this.onSave()
    this.props.navigation.setParams({ handleSave: saveCallback});
  }

  onSave() {
    this.props.navigation.state.params.saveProjectDetailsCallback(this.state.text)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Name' editable={true} autoFocus={true}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
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