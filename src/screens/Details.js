import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert, 
  View,
  ActivityIndicator
} from 'react-native';

import { CheckBox } from 'react-native-elements'
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
      updatedItems.push({id: item.key, name: item.val().name })
    });
    this.setState({items: updatedItems, loading: false})
  }

  renderItem = ({item, index}) => {
    return (
      <View style={styles.row}>
        <CheckBox style={styles.checkbox} textStyle={styles.text} title={item.name}/>
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