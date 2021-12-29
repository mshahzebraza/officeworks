import React from 'react'
import { useSelector } from 'react-redux'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { refId: '1' } },
      { params: { refId: '2' } },
      { params: { refId: '3' } }
    ],
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const pid = context.params.refId;

  return {
    props: {
      pid
    }
  }
}

export default function POdetail(props) {

  const poData = useSelector(state => { return state.po.find(item => item.refId === props.pid) })

  poData && console.log(poData);
  poData.refId && console.log(poData.refId);

  return (
    <>
      <h1>{poData.refId} </h1>
    </>
  )
}

