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

// Due to some reason getStaticProps was not working !!!
export async function getServerSideProps(context) {
  const pageId = context.params.refId;
  return {
    props: {
      pageId
    }
  }
}


const POdetailPage = ({ pageId }) => <POdetailPageComp pageId={pageId || 99} />

export default POdetailPage;
