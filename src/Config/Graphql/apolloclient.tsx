import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
  } from "@apollo/client";
  
  const client = new ApolloClient({
    // uri: "https://suprabhaatham-dev.herokuapp.com/graphql",
    uri: "https://green-good-news-server-9a460dab0f63.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });
  
  export default client;
