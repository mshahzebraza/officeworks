import '../styles/globals.scss';
// import { Provider, useDispatch } from 'react-redux';
// import { store } from '../store/index'
// import 'bootstrap/dist/css/bootstrap.min.css';

import { ApolloProvider } from "@apollo/client";
import client from '../lib/apollo_client/index';
import poApollo from '../lib/apollo_client/poApollo';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    (async () => {
      // Request data for all slices from a single endpoint
      const res = await fetch('http://localhost:3000/api/po');
      const resJSON = await res.json();
      poApollo(resJSON.data)
    })()

  }, []);


  return (
    <ApolloProvider client={client} >
      <div id="portalRoot"></div>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
