import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'

import React, { useEffect } from 'react';
import POdetailPageComp from '../../../components/PO/Detail/indexDetail.js';

// use getServerSideProps to get the pageId from the url
export async function getServerSideProps({ params }) {
     const refId = params.refId;
     return {
          props: {
               refId
          }
     }
}

// Rendering frontend
const POdetailPage = ({ refId }) => {

     return (
          <POdetailPageComp pageId={refId || ''} />
     )
     // const { query: { refId }, isReady } = useRouter();
     // return (
     //      isReady ?
     //           <POdetailPageComp pageId={refId || ''} />
     //           : <div>Router Loading...</div>
     // )
}
export default POdetailPage;
