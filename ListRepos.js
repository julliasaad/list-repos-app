import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';


const client = new ApolloClient({
  uri: "https://api.github.com/graphql"
});

client
  .query({
    query: gql`
      {
        repositoryOwner(login: "julliasaad"){
          repositories(last: 10) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                name
              }
            }
          }
        }
      }
    `
  })
  .then(({ data }) => console.log({ data }));

export default class ListRepos extends Component {
  static navigationOptions = {
    title: "List Repos App",
    headerTitleStyle: {
      fontWeight: '300',
    }
  }

  constructor(props) {
    super(props);
    this.state = { text: 'Put the @githubUsername here' };
    this.RepositoriesByUser;
  }

  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Let's find out the last 10 repositories of our friends on GitHub!</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <ApolloProvider client={client}>
            <div>
              <h2>My first Apollo app 🚀</h2>
            </div>
          </ApolloProvider>
          {/* <Query client={client}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return data.repositories.edges.map(({ repo }) => (
                <div key={repo.node.name}>
                  <p>{repo.node.name}</p>
                </div>
              ));
            }}
          </Query> */}
        </View>
      );
  }
}

// const RepositoriesByUser = () => (
//   <Query query={getRepositories}>
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;

//       return data.repositoryOwner.repositories.edges.map(({ repo }) => (
//         <div key={repo.node.name}>
//           <p>{repo.node.name}</p>
//         </div>
//       ));
//     }}
//   </Query>
// );

 
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'   
  },
  welcomeText: {
    color: '#666',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15
  },
  input: {
    padding: 10,
    fontSize: 20,
  }
});