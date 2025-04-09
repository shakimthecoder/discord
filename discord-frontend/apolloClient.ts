import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { ApolloClient } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

loadErrorMessages();
loadDevMessages();

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; {$name}=`)
    if(value.length === 2) return parts.pop()?.split(';').shift();
}

const authLink = setContext(
    async (_, { headers }) => {
        const token = getCookie("__session");
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    }
)

const uploadLink = createUploadLink({
    uri: "http://localhost:3000/graphql",
    headers: {
        "apollo-require-preflight": "true",
    }
})


const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      })
  
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    }
  })

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: authLink.concat(uploadLink).concat(errorLink),
    cache,
})

export default client;