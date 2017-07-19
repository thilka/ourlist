import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StackNavigator} from 'react-navigation'
import firebase from './firebase/FirebaseConfig'

import ProjectList from './screens/ProjectList';
import Details from './screens/Details';
import AddProject from './screens/AddProject'

export default class App extends Component {

  static navigationOptions = {
    headerTitle: "OurList",
    headerStyle: { backgroundColor: '#58a2fb'},
    headerAlignment: 'center'
  }

  componentDidMount() {
    firebase.auth().signInAnonymously()
      .then((user) => {
       console.log('Anonymous user logged in'); 
      })
      .catch((err) => {
        console.error('Anonymous user signin error', err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ProjectList navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


/////////////////////////////////////////////////////////
// Navigation

const Navigation = StackNavigator({
  Home: { screen: App, },
  Details: { screen: Details, },
  AddProject: { screen: AddProject, },
})

AppRegistry.registerComponent('ourlist', () => Navigation);
