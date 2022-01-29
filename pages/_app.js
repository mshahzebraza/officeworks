import '../styles/globals.scss';
// import { Provider, useDispatch } from 'react-redux';
// import { store } from '../store/index'
// import 'bootstrap/dist/css/bootstrap.min.css';

import { ApolloProvider } from "@apollo/client";
import client from '../lib/apollo_client/index';

function MyApp({ Component, pageProps }) {


  return (
    <ApolloProvider client={client} >
      <div id="portalRoot"></div>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
