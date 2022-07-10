import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'

import React, { useEffect } from 'react';
import MWOdetailPageComp from '../../../components/MWO/Detail/indexDetail.js';

// use getServerSideProps to get the pageId from the url
export async function getServerSideProps({ params }) {
     const mwoId = params.mwoId;
     return {
          props: {
               mwoId
          }
     }
}

// Rendering frontend
const MWOdetailPage = ({ mwoId }) => {

     return (
          <MWOdetailPageComp pageId={mwoId || ''} />
     )
     // const { query: { mwoId }, isReady } = useRouter();
     // return (
     //      isReady ?
     //           <MWOdetailPageComp pageId={mwoId || ''} />
     //           : <div>Router Loading...</div>
     // )
}
export default MWOdetailPage;
