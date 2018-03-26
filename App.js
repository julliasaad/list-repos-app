import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/Welcome.js';
import SearchView from './components/SearchView.js';
import { StackNavigator } from 'react-navigation';

class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}

const RootStack = StackNavigator(
  {
    Welcome: {
      screen: Welcome,
    },
    SearchView: {
      screen: SearchView,
    },
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default RootStack;

