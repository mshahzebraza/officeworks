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
import moduleApollo from '../lib/apollo_client/moduleApollo';

import { useEffect } from 'react';
import { httpParams, request } from '../helpers/reusable';
import { ThemeProvider, CssBaseline } from '@mui/material';
import projectTheme from '../projectTheme';



function MyApp({ Component, pageProps }) {

    // Function to get the application data from the server
    const loadAppData = async () => {
        // Fetching the data from the server
        /*   const {
               success,
               data: { poList, mwoList, projectList, transactionList },
               error,
               message
          } = await request({
               url: 'http://localhost:3000/api/initialize',
          }); */
        const res = await httpParams('http://localhost:3000/api/initialize');
        const {
            success,
            data: { poList, mwoList, projectList, transactionList, moduleList },
            error,
            message
        } = await res.json();

        // const {
        //     success,
        //     data: { poList, mwoList, projectList, transactionList, moduleList },
        //     error,
        //     message
        // } = await request({
        //     url: process.env.API.INITIALIZE
        // });


        // delete poList.__v;
        delete mwoList.__v;
        delete projectList.__v;
        delete transactionList.__v;
        delete moduleApollo.__v;


        // setTimeout(() => {

        moduleApollo({
            list: moduleList,
            fetched: true
        })
        poApollo({
            list: poList,
            fetched: true
        });
        mwoApollo({
            list: mwoList,
            fetched: true
        });
        projectApollo({
            list: projectList,
            fetched: true
        });
        transactionApollo({
            list: transactionList,
            fetched: true
        });

        // }, 1000);

        // Log the data
        console.log(
            // "moduleList", moduleList,
            // 'poList', poList,
            // "mwoList", mwoList,
            // "projectList", projectList,
            // "transactionList", transactionList
        );

    }
    useEffect(() => {
        loadAppData() // Initialize the app data into app state.

    }, []);

    return (
        <ThemeProvider theme={projectTheme} >
            <CssBaseline />
            <ApolloProvider client={client} >
                <div id="portalRoot" style={{ position: 'absolute', zIndex: 1201 }} ></div>
                <Component {...pageProps} />
            </ApolloProvider>
        </ThemeProvider>
    )
}

export default MyApp
