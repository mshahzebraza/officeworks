import '../styles/globals.scss';
// import { Provider, useDispatch } from 'react-redux';
// import { store } from '../store/index'
// import 'bootstrap/dist/css/bootstrap.min.css';

import { ApolloProvider } from "@apollo/client";
import client from '../lib/apollo_client/index';

import poApollo from '../lib/apollo_client/poApollo';
import mwoApollo from '../lib/apollo_client/mwoApollo';
import projectApollo from '../lib/apollo_client/projectApollo';
import transactionApollo from '../lib/apollo_client/transactionApollo';

import { useEffect } from 'react';
import { httpParams } from '../helpers/reusable';

function MyApp({ Component, pageProps }) {


  useEffect(() => {

    // Function to get the application data from the server
    const loadAppData = async () => {
      // Fetching the data from the server
      const res = await httpParams('http://localhost:3000/api/initialize');
      // Destructuring the response
      const { data: { poList, mwoList, projectList, transactionList } } = await res.json();

      // Inserting data into the store
      poApollo(poList);
      mwoApollo(mwoList);
      projectApollo(projectList);
      transactionApollo(transactionList);

      // Log the data
      /* console.log(
        'poList', poList,
        "mwoList", mwoList,
        "projectList", projectList,
        "transactionList", transactionList
      ); */

    }

    loadAppData() // Initialize the app data into app state.

  }, []);

  return (
    <ApolloProvider client={client} >
      <div id="portalRoot"></div>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
