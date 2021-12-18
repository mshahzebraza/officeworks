import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout/Layout'


export default function Procurement(pProps) {

  return (
    <Layout pageClasses={['tempContainer']}>

      <Link href='/procurement/po' >
        <a className="tempBox">POs</a>
      </Link>
      <Link href='/procurement/mwo'>
        <a className="tempBox">MWOs</a>
      </Link>

    </Layout>
  )
}
