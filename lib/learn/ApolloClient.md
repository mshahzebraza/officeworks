This document discusses the benefits as well as the benchmarks when switching from **`Redux`** to **`Apollo Client`**.
**`Redux`** is a state management library which makes the flow of data among loosely connected components easier. However, setting up and using **`Redux`** is a big pain.
**`Apollo Client`** is based on **`GraphQL`** and is a very good alternative to **`Redux`** state management system. There are other **`GraphQL`** based frontend systems but **`Apollo Client`** seems easiest to start with.

### Setting up

#### Apollo Client

The first step would be to create an **`ApolloClient`** class instance.

Let's create it in a `lib/apollo_client/index.js` file.

```
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache()
})

export default client;
```

#### Apollo Provider

Then, we would go to our **`_app.js`** file, and wrap it in **`ApolloProvider`**. Also, don't forget to pass in the `ApolloClient` in the `ApolloProvider`

```
import { ApolloProvider } from "@apollo/client";
import client from '../lib/apollo_client/index';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client} >
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
```

That's it! We've successfully set up the our state-management system. Our code at this stage is equivalent to setting up a `redux-store`.

Let's create the equivalent of `redux-slices` in the next section.
