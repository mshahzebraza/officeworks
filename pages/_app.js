import { ApolloProvider } from "@apollo/client";
import client, {
    moduleClientState,
    mwoClientState,
    poClientState
} from '../client/handlers/clientState';


import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import projectTheme from '../client/theme/projectTheme';
import { requestAPI } from '../helpers/refactored/requestAPI';


function MyApp({ Component, pageProps }) {
    console.log('_app.js')

    // Function to get the application data from the server
    const loadAppData = async () => {
        // Fetching the data from the server
        const {
            success,
            data: { poList, mwoList, moduleList },
            error,
            message
        } = await requestAPI({
            url: 'http://localhost:3000/api/initialize',
        });

        if (!success) throw new Error('Error:', error)

        delete moduleClientState.__v;
        delete poList.__v;
        delete mwoList.__v;

        moduleClientState({
            list: moduleList,
            fetched: true
        })
        poClientState({
            list: poList,
            fetched: true
        });
        mwoClientState({
            list: mwoList,
            fetched: true
        });

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
