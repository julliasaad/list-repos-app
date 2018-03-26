import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import Repositories from './Repositories';

const ViewContainer = styled.View`
  height: 100%;
  display: flex;
  align-items: stretch;
  padding: 20px;
  background-color: #fff;
`;

const Title = styled.Text`
  margin-bottom: 10px;
  color: #666;
  font-weight: 400;
  fontSize: 20;
  textAlign: center;
`;

const Input = styled.TextInput`
  padding: 10px;
  font-size: 20px;
`;

const SearchButton = styled.Button`
  margin-bottom: 15px;
`;

export default class SearchView extends Component {
  static navigationOptions = {
    title: "List Repos App",
    headerTitleStyle: {
      fontWeight: '300',
    }
  }

  constructor(props) {
    super(props);
    this.state = { inputPlaceholder: 'Put the "username" here...', text: '', search: false, newSearch: '' };
    this.search = this.search.bind(this);
    this.newSearch = '';
  }
  
  search() {
    this.setState({
      text: this.state.newSearch,
      search: true
    });
  }

  render() {
    return (
      <ViewContainer>
        <Title>Let's find out the last 10 repositories of our friends on GitHub!</Title>
        <Input
          placeholder={this.state.inputPlaceholder}
          autoFocus={true}
          onChangeText={(text) => this.setState({newSearch: text, search: false})}
        />
        <SearchButton 
          onPress={this.search}
          title="Search"
          color="#1b8cdc"
        />
        {
          this.state.search ?
          <Repositories 
            login={this.state.text}
          />
          :
          <Text></Text>
        }
      </ViewContainer>
    );
  }
}