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
import moduleApollo from '../lib/apollo_client/poItemApollo';

import { useEffect } from 'react';
import { httpParams, request } from '../helpers/reusable';

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
          // const { data: { poList, mwoList, projectList, transactionList } } = await res.json();
          const {
               success,
               data: { poList, mwoList, projectList, transactionList, moduleList }
               ,
               error,
               message
          } = await res.json();

          // console.log('modules', moduleList);


          delete poList.__v;
          delete mwoList.__v;
          delete projectList.__v;
          delete transactionList.__v;
          delete moduleApollo.__v;


          // Inserting data into the store
          // ! START: Convert the normalized data to nested data in the po structure.
          // ? This is done to make the data easier to use in the application.
          // TODO: make the following code reusable
          {
               // poList = poList.reduce(
               //      (prevPOlist, curPO) => {

               //           const { linkedModules } = curPO;
               //           // map through each module in linkedModules of curPO and replace the _id reference with the module object matching in moduleList
               //           const transformedLinkedModules = linkedModules.map(
               //                (linkedModule) => {
               //                     // fetch item(_id ref) from linkedModule 
               //                     const { item: moduleRef } = linkedModule;
               //                     delete linkedModule.item;
               //                     // find the matching module in moduleList
               //                     const matchingModuleDetail = moduleList.find(
               //                          (module) => module._id === moduleRef
               //                     );
               //                     // replace the item(_id ref) with the matching module object
               //                     return {
               //                          ...linkedModule,
               //                          ...matchingModuleDetail
               //                          // item: matchingModuleDetail
               //                     }
               //                }
               //           )
               //           // replace the mapped old linkedModules with the transformedLinkedModules of the curPO
               //           prevPOlist.push({
               //                ...curPO,
               //                linkedModules: transformedLinkedModules
               //           });
               //           return prevPOlist;
               //      },
               //      []
               // )
          }
          // ! END: Convert the normalized data to nested data in the po structure.

          setTimeout(() => {

               moduleApollo({
                    list: moduleList,
                    fetched: true
               })
               poApollo({
                    list: poList,
                    fetched: true
               });
               mwoApollo(mwoList);
               projectApollo(projectList);
               transactionApollo(transactionList);

          }, 1000);

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
          <ApolloProvider client={client} >
               <div id="portalRoot"></div>
               <Component {...pageProps} />
          </ApolloProvider>
     )
}

export default MyApp
