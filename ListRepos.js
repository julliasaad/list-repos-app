import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import gql from 'graphql-tag';
import { graphql, Query, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import apolloLogger from 'apollo-link-logger';
import { compose } from 'recompose';
import Icon from 'react-native-vector-icons/FontAwesome';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: 'bearer 69df52cb1f2e110618d25f71e7d4526153ca75a6'
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
  errorLink,
  apolloLogger,
  httpLink
]);

const cache = new InMemoryCache({
  logger: console.log,
  loggerEnabled: true
});

const client = new ApolloClient({
  link,
  cache
});

const REPOSITORIES_OF_A_USER = gql`
  query($login: String!) {
    user(login: $login) {
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
function Repositories(props) {
    const login = props.login;
    if(props.search) {
      return (
        <View style={styles.listContainer}>
          <ApolloProvider client={client}>
              <Query query={REPOSITORIES_OF_A_USER} variables={{login}}>
                {({ loading, error, data }) => {
                  if (loading) return loading;
                  if (error) {
                    return (
                      <View style={styles.errorContainer}>
                        <Text style={styles.listTitle}><Icon name="warning" size={18} color="red"/> Sorry, user {login} not found :(</Text>
                        <Text>Put a valid username and try again!</Text>
                      </View>
                    );
                  } 

                  return (
                    <View>
                      <Text style={styles.listTitle}>Last 10 {login}'s repositories</Text>
                      {data.user.repositories.edges.map((repo) => (
                        <Text key={repo.node.name} style={styles.repo}><Icon name="folder-o" size={18} color="#1b8cdc" /> {repo.node.name}</Text>
                      ))}
                    </View>
                  );
                }}
              </Query>
          </ApolloProvider>
        </View>
      );
    } else {
      return (
        <Text></Text>
      );
    }
};

export default class ListRepos extends Component {
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
    console.log('new text: ' + this.state.newSearch);
    this.setState({
      text: this.state.newSearch,
      search: true
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Let's find out the last 10 repositories of our friends on GitHub!</Text>
        <TextInput
          style={styles.input}
          placeholder={this.state.inputPlaceholder}
          autoFocus={true}
          onChangeText={(text) => this.setState({newSearch: text})}
        />
        <Button 
          style={styles.searchButton}
          onPress={this.search}
          title="Search"
          color="#1b8cdc"
        />
        <Repositories search={this.state.search} login={this.state.text}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'   
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    paddingTop: 20,
  },
  searchButton: {
    marginBottom: 15
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  repo: {
    padding: 2
  },
  welcomeText: {
    color: '#666',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  input: {
    padding: 10,
    fontSize: 20
  }
});