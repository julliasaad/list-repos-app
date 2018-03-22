import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Welcome extends Component {
  static navigationOptions = {
    title: "List Repos App",
    headerTitleStyle: {
      fontWeight: '300',
    }
  }

  start() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}> Welcome to the List Repos App!</Text>
        <Image source={require('./img/octocat.jpg')}  style={{width: 80, height: 80, marginBottom: 15}}/>
        <Button 
          onPress={() => this.props.navigation.navigate('ListRepos')}
          title="Let's start"
          color="#1b8cdc"
          accessibilityLabel="Let's start to use the app"
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center'  
  },
  welcomeText: {
    color: '#1b8cdc',
    fontWeight: '300',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15
  }
});

{/* <Image source={pic} style={{width: 193, height: 110}}/> */}