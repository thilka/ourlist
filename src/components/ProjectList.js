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

import firebase from '../firebase/FirebaseConfig'

import AddButton from './AddButton'

const initialProjects = [
  {id: 1, name: 'Project 1'},
  {id: 2, name: 'Project 2'},
];

export default class ProjectList extends Component {

  constructor() {
    super();
    this.ref = null;
    this.state = {
      projects: initialProjects
    }
  }

  // On mount, subscribe to ref updates
  componentDidMount() {
    firebase.auth().signInAnonymously()
      .then((user) => {
       console.log('Anonymous user logged in'); 
      })
      .catch((err) => {
        console.error('Anonymous user signin error', err);
      });


      this.ref = firebase.database().ref('projects');
      this.ref.on('value', (snapshot) => {
        const updatedProjects = []
        const remoteProjects = snapshot.val();

        for (project in remoteProjects) {
          const name = remoteProjects[project].name
          updatedProjects.push({id: project, name: name })
        }
        this.setState({projects: updatedProjects})
      });
  }

  // On unmount, ensure we no longer listen for updates
  componentWillUnmount() {
    if (this.ref) {
      this.ref.off('value', this.handlePostUpdate);
    }
  }

  // Bind the method only once to keep the same reference
  handlePostUpdate = (snapshot) => {
    console.log('Post Content', snapshot.val());
  }

  onAddProject() {
    name = this.state.projects.length + 1; 
    firebase.database().ref('projects').push({
        name: name
    });
  }

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
      <View style={{flex:1}}>
        <AddButton onPress={() => this.onAddProject()}/>
        <FlatList 
          data={this.state.projects} 
          keyExtractor={(item) => item.id} 
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
    fontSize: 18,
    alignSelf: 'center'
  }
});