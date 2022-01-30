import React from 'react';
import POdetailPageComp from '../../../../components/PO/indexDetail';



// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { refId: '1' } },
//       { params: { refId: '2' } },
//       { params: { refId: '3' } }
//     ],
//     fallback: 'blocking'
//   }
// }

export async function getServerSideProps(context) {
  const pageId = context.params.refId;
  return {
    props: {
      pageId
    }
  }
}


const PODetailPage = ({ pageId }) => <POdetailPageComp pageId={pageId || 99} />

export default PODetailPage;
