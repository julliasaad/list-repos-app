import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';

const WelcomeContainer = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const WelcomeText = styled.Text`
  margin-bottom: 15px;
  color: #1b8cdc;
  font-weight: 300;
  font-size: 30px;
  text-align: center;
`;

const WelcomeImage = styled.Image`
  width: 90; 
  height: 90; 
  margin-bottom: 15px;
`;

export default class Welcome extends Component {
  static navigationOptions = {
    title: "List Repos App",
    headerTitleStyle: {
      fontWeight: '300'
    }
  }

  render() {
    return (
      <WelcomeContainer>
        <WelcomeText> Welcome to the List Repos App!</WelcomeText>
        <WelcomeImage source={require('../img/octocat.jpg')} />
        <Button 
          onPress={() => this.props.navigation.navigate('SearchView')}
          title="Let's start"
          color="#1b8cdc"
          accessibilityLabel="Let's start to use the app"
        />
      </WelcomeContainer>
    );
  }
}