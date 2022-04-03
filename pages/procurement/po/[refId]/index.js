import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'

import React from 'react';
import POdetailPageComp from '../../../../components/PO/IndexDetail';

// use react router to route to the correct PO detail page


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
// export async function getServerSideProps(context) {
//      const pageId = context.params.refId;
//      return {
//           props: {
//                pageId
//           }
//      }
// }

const POdetailPage = (props) => {
     const router = useRouter();

     return (
          <POdetailPageComp pageId={router.query.refId || ''} />
     )
}
// const POdetailPage = () => {
//      const router = useRouter();
//      const { refId: pageId } = router.query;

//      return <POdetailPageComp pageId={pageId || 99} router={router} />
// }

// export default dynamic(() => Promise.resolve(POdetailPage), {
//      ssr: false
// })

export default POdetailPage;
