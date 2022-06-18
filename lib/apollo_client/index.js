import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";


const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: /* process.env.NODE_ENV === 'development' */true,
    //   clientState: {
    //     defaults: {
    //       isLoggedIn: false,
    //       user: null,
    //     },
    //     resolvers: {
    //       Mutation: {
    //         logout: (_, __, { cache }) => {
    //           cache.writeData({ data: { isLoggedIn: false, user: null } });
    //           return null;
    //         },
    //       },
    //     },
    //   },
    // link: createHttpLink({ uri: "http://localhost:3000" })
})

export default client;