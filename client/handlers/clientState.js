import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";


const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: /* process.env.NODE_ENV === 'development' */true,
})

export const poClientState = makeVar({ fetched: false, list: [] })
export const mwoClientState = makeVar({ fetched: false, list: [] })
export const moduleClientState = makeVar({ fetched: false, list: [] })

export default client;