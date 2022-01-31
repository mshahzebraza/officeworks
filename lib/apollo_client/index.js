import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: /* process.env.NODE_ENV === 'development' */true,
  // link: createHttpLink({ uri: "http://localhost:3000" })
})

export default client;