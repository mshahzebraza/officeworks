import { ApolloProvider } from "@apollo/client";
import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import projectTheme from '../client/theme/projectTheme';
import client, { moduleClientState, mwoClientState, poClientState } from '../client/store/config';
import { requestAPI } from '../helpers/refactored/requestAPI';


function MyApp({ Component, pageProps }) {
    console.log('_app.js')

    // Function to get the application data from the server
    const loadAppData = async () => {
        // Fetching the data from the server
        const {
            success,
            data,
            error,
            message
        } = await requestAPI({
            url: 'http://localhost:3000/api/all',
        });
        if (!success) throw new Error('Error:', error || message)

        // delete data versions
        for (const list of data) delete list.__v

        moduleClientState({ list: data.moduleList, fetched: true })
        poClientState({ list: data.poList, fetched: true });
        mwoClientState({ list: data.mwoList, fetched: true });

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
