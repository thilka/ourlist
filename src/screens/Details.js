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

import AddButton from '../components/AddButton'
import DetailItem from '../components/DetailItem'

export default class Details extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.project.name,
    headerStyle: { backgroundColor: '#58a2fb'},
    headerTintColor: 'black',
  })

  constructor() {
    super();
    this.ref = null;
    this.state = {
      items: null,
      loading: true,
      swipedItem: null
    }
  }

  // On mount, subscribe to ref updates
  componentDidMount() {
    const {project} = this.props.navigation.state.params

    this.ref = firebase.database().ref('items').equalTo(project.id).orderByChild('project');
    this.ref.on('value', this.handleUpdates)  
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

  onAddItem() {
    const { navigate } = this.props.navigation
    navigate("AddProject", {saveProjectDetailsCallback: this.saveItemCallback})
  }

  saveItemCallback = (itemName) => {
    const {project} = this.props.navigation.state.params

    this.ref.push({
      project: project.id,
      name: itemName,
      done: false
    })
    this.props.navigation.goBack(null)
  }

  itemPressed = (item) => {
    item.done = !item.done

    var updates = {
      done: item.done
    }
    this.ref.child(item.id).update(updates)
  }

  itemSwiped = (sid, rid, direction) => {
    this.setState({swipedItem: rid})
  }   

  onDelete() {
    this.ref.child(this.state.swipedItem).remove()
  }

  renderItem = ({item, index}) => {

    return (
      <DetailItem item={item} 
        wasLastSelected={this.state.swipedItem === item.id}
        itemSwiped={(sid, rid, direction) => this.itemSwiped(sid, rid, direction)}
        onPress={() => this.itemPressed(item)}
        onDelete={() => this.onDelete()}
        />
    )
  }

  render() {
    return (
      this.state.loading ? 
        <ActivityIndicator color='#000000' size='large' /> : 
        (
          <View style={styles.detailsPane}>
            <AddButton onPress={() => this.onAddItem()}/>
            <View style={styles.headerFooter} />

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
  row: {
    flex: 1,
    padding: 2,
  },
  detailsPane: {
    backgroundColor: 'white',
    flex:1
  },
  headerFooter: {
    height: 3,
    backgroundColor: "#58a2fb"
  }
});