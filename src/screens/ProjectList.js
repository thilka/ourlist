import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  View, 
  ActivityIndicator,
  Text
} from 'react-native';

import firebase from '../firebase/FirebaseConfig'

import AddButton from '../components/AddButton'
import ProjectItem from '../components/ProjectItem'

export default class ProjectList extends Component {

  constructor() {
    super();
    this.ref = null;
    this.state = {
      projects: [],
      selectedProject: null,
      loading: true
    }
  }

  // On mount, subscribe to ref updates
  componentDidMount() {
      this.ref = firebase.database().ref('projects');
      this.ref.orderByChild('created').on('value', this.handleUpdates)
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

    snapshot.forEach((project) => {
      updatedProjects.push({id: project.key, name: project.val().name })
    });
    this.setState({projects: updatedProjects, loading: false})
  }

  onAddProject() {
    const { navigate } = this.props.navigation
    navigate("AddProject", {saveProjectDetailsCallback: this.saveProjectDetailsCallback})
  }

  saveProjectDetailsCallback = (projectName) => {
    this.ref.push({
        name: projectName,
        created: new Date().getTime(),
    });
    this.props.navigation.goBack(null)
  }

  onPress = (item) => {
    const { navigate } = this.props.navigation
    navigate("Details", {project: item})
  }

  onDelete = (item) => {
    firebase.database().ref('projects/' + this.state.selectedProject).remove()
  }

  itemSelected = (sid, rid, direction) => {
    this.setState({selectedProject: rid})
  }    

  renderItem = ({item, index}) => {
    return (
      <ProjectItem 
        onPress={() => this.onPress(item)} 
        item={item}
        wasLastSelected={this.state.selectedProject === item.id}
        itemSelected={(sid, rid, direction) => this.itemSelected(sid, rid, direction)}
        onDelete={(item) => this.onDelete(item)}/>
    )
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator} />
    )
  }

  render() {

    return (
      this.state.loading ? 
          <ActivityIndicator color='#000000' size='large' /> : 
          (
            <View style={{flex:1}}>
              <AddButton onPress={() => this.onAddProject()}/>
              <View style={styles.headerFooter} />
              <FlatList 
                data={this.state.projects} 
                extraDate={this.state}
                keyExtractor={(item) => item.id} 
                renderItem={this.renderItem} 
                ItemSeparatorComponent={this.renderSeparator}
              />
              <View style={styles.headerFooter} />
              <View style={{alignItems:'flex-end', padding: 7}}>
                <Text>{this.state.projects.length} Items</Text>
              </View>
            </View>
        )
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#58a2fb",
  },
  headerFooter: {
    height: 3,
    backgroundColor: "#58a2fb"
  }

});