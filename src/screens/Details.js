import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert, 
  View,
  ActivityIndicator,
  TextInput
} from 'react-native';

import { CheckBox, Button } from 'react-native-elements'
import firebase from '../firebase/FirebaseConfig'

export default class Details extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.item.name,
    headerStyle: { backgroundColor: '#58a2fb'},
    headerTintColor: 'black',
  })

  constructor() {
    super();
    this.ref = null;
    this.state = {
      items: null,
      loading: true
    }
  }

  // On mount, subscribe to ref updates
  componentDidMount() {
    const {item} = this.props.navigation.state.params

    this.ref = firebase.database().ref('items');
    this.ref.equalTo(item.id).orderByChild('project').on('value', this.handleUpdates)
  }

  // On unmount, ensure we no longer listen for updates
  componentWillUnmount() {
    if (this.ref) {
      this.ref.off('value', this.handleUpdates);
    }
  }

  // Bind the method only once to keep the same reference
  handleUpdates = (snapshot) => {
    updatedItems = []

    snapshot.forEach((item) => {
      updatedItems.push({id: item.key, name: item.val().name, done: item.val().done })
    });
    this.setState({items: updatedItems, loading: false})
  }

  renderItem = ({item, index}) => {
    doneIconColor = item.done ? 'green' : 'grey'
    backgroundColor = item.done ? 'lightgreen' : 'white'

    return (
      <View >
        {/*<CheckBox style={styles.checkbox} textStyle={styles.text} title={item.name}/>*/}
        <View style={styles.row}>
          <Button icon={{name:'check-circle', color:doneIconColor, size:20}}
            title={item.name} backgroundColor={backgroundColor} color='black' underlayColor='lightgrey'
            buttonStyle={{flexDirection: 'row'}} />
          {/*<TextInput style={styles.input} placeholder='Name' editable={false} autoFocus={true}
          onChangeText={this.onChangeText}
          value={item.name}/>*/}
        </View>
      </View>
    )
  }

  render() {
    return (
      this.state.loading ? 
        <ActivityIndicator color='#000000' size='large' /> : 
        (
          <View style={styles.detailsPane}>
            <FlatList 
              data={this.state.items}
              extraData={this.state} 
              keyExtractor={(item) => item.name} 
              renderItem={this.renderItem} />
          </View>
        )
    )
  }
}

const styles = StyleSheet.create({
  // item: {
  //   flex:1,
  //   padding: 20,
  //   justifyContent: 'center',
  //   borderColor: 'black',
  //   borderBottomWidth: 1
  // },
  // text: {
  //   alignSelf: 'center',
  //   fontSize:15
  // },
  // checkbox: {
  //   // to override default style
  // },
  row: {
    // flexDirection: 'row',
    flex: 1,
    padding: 5,
    // alignContent: 'flex-start',
    // alignSelf: 'center'
  },
  detailsPane: {
    backgroundColor: 'white',
    flex:1
  },
  // input: {
  //   padding: 10,
  //   fontSize: 16,
  //   justifyContent: 'center',
  //   margin:2,
  //   backgroundColor: 'white'
  // },
});