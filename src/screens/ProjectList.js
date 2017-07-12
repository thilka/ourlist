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
import Swipeout from 'react-native-swipeout'

import AddButton from '../components/AddButton'

const initialProjects = [
  {id: 1, name: 'Project 1'},
  {id: 2, name: 'Project 2'},
];

export default class ProjectList extends Component {

  constructor() {
    super();
    this.ref = null;
    this.state = {
      projects: initialProjects,
      selectedProject: null
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
    const { navigate } = this.props.navigation
    navigate("AddProject", {saveProjectDetailsCallback: this.saveProjectDetailsCallback})
  }

  saveProjectDetailsCallback = (projectName) => {
    firebase.database().ref('projects').push({
        name: projectName
    });
    this.props.navigation.goBack(null)
  }

  onPress = (item) => {
    const { navigate } = this.props.navigation
    navigate("Details", {item: item})
  }

  buttons = [
    {
      text: 'Delete',
      onPress: (item) => this.onDelete(item),
      type: 'delete'
    }
  ]

  onDelete = (item) => {
    console.log("Deleting item {this.state.selectedProject}")
    console.log(item)
    console.log(this.state.selectedProject)
    firebase.database().ref('projects/' + this.state.selectedProject).remove()
    
  }

  itemSelected = (sid, rid, item, str) => {
    console.log(sid)
    console.log(rid)
    console.log(item)
    console.log(str)
    this.setState({selectedProject: rid})
  }    


  renderItem = ({item, index}) => {
    buttons = [
      {
        text: 'Delete',
        onPress: (item) => this.onDelete(item),
        type: 'delete'
      }
    ]


    return (
      <Swipeout rowID={item.id} onOpen={(sid, rid, index, str) => this.itemSelected(sid, rid, index, str)} right={buttons} backgroundcolor='white' style={styles.swipes}>
        <TouchableHighlight underlayColor='lightgrey' style={styles.item} onPress={() => this.onPress(item)}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator} />
    )
  }

  render() {
    return (
      <View style={{flex:1}}>
        <AddButton onPress={() => this.onAddProject()}/>
        <FlatList 
          data={this.state.projects} 
          keyExtractor={(item) => item.id} 
          renderItem={this.renderItem} 
          
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex:1,
    padding: 20,
    justifyContent: 'center',
    //borderColor: 'black',
    //borderBottomWidth: 1
  },
  text: {
    fontSize: 18,
    alignSelf: 'center'
  },
  swipes: {
    backgroundColor: 'transparent'
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  }

});