import React from 'react';
import { compose, pure } from 'recompose';
import { View, Text, TextInput } from 'react-native';
import gql from 'graphql-tag';
import { graphql, Query, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import apolloLogger from 'apollo-link-logger';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

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
`;

const ListContainer = styled.View`
  padding-top: 20px;
`;

const ErrorContainer = styled.View`
  display: flex;
  align-items: center;
`;

const ErrorTitle = styled.Text`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
`;

const ListTitle = styled.Text`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
`;

const RepositoryItem = styled.Text`
  padding: 2px;
`;

const Repositories = ({login}) => {
  return (
    <ListContainer>
      <ApolloProvider client={client}>
        <Query query={REPOSITORIES_OF_A_USER} variables={{login}}>
          {({ loading, error, data }) => {
            if (loading) return loading;
            
            if(error) {
              return (
                <ErrorContainer>
                  <ErrorTitle><Icon name="warning" size={18} color="red"/> Sorry, user {login} not found :(</ErrorTitle>
                  <Text>Put a valid username and try again!</Text>
                </ErrorContainer>
              );
            } 

            return (
              <View>
                <ListTitle>Last 10 {login}'s repositories</ListTitle>
                {data.user.repositories.edges.map((repo) => (
                  <RepositoryItem key={repo.node.name}><Icon name="folder-o" size={18} color="#1b8cdc" /> {repo.node.name}</RepositoryItem>
                ))}
              </View>
            );
          }}
        </Query>
      </ApolloProvider>
    </ListContainer>
  );
}

export default compose(
  pure
)(Repositories);