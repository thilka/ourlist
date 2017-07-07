import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StackNavigator} from 'react-navigation'

import ProjectList from './components/ProjectList';
import Details from './components/Details';

export default class App extends Component {

  static navigationOptions = {
    headerTitle: "OurList",
    headerStyle: { backgroundColor: 'white'},
    headerAlignment: 'center'
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
})

AppRegistry.registerComponent('ourlist', () => Navigation);
