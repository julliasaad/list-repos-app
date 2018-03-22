import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Welcome.js';
import ListRepos from './ListRepos.js';
import { StackNavigator } from 'react-navigation';

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = StackNavigator(
  {
    Welcome: {
      screen: Welcome,
    },
    ListRepos: {
      screen: ListRepos,
    },
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default RootStack;

