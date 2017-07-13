import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  View
} from 'react-native';

import firebase from '../firebase/FirebaseConfig'

import AddButton from '../components/AddButton'
import ProjectItem from '../components/ProjectItem'

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
      this.ref = firebase.database().ref('projects');
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
    const updatedProjects = []
    const remoteProjects = snapshot.val();

    for (project in remoteProjects) {
      const name = remoteProjects[project].name
      updatedProjects.push({id: project, name: name })
    }
    this.setState({projects: updatedProjects})
  }

  onAddProject() {
    const { navigate } = this.props.navigation
    navigate("AddProject", {saveProjectDetailsCallback: this.saveProjectDetailsCallback})
  }

  saveProjectDetailsCallback = (projectName) => {
    this.ref.push({
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
    firebase.database().ref('projects/' + this.state.selectedProject).remove()
  }

  itemSelected = (sid, rid, direction) => {
    this.setState({selectedProject: rid})
  }    

  buttons = [
    {
      text: 'Delete',
      onPress: (item) => this.onDelete(item),
      type: 'delete'
    }
  ]

  renderItem = ({item, index}) => {
    return (
      <ProjectItem 
        onPress={() => this.onPress(item)} 
        item={item}
        itemSelected={(sid, rid, direction) => this.itemSelected(sid, rid, direction)}
        buttons={this.buttons}/>
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
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  }

});