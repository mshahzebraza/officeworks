import React from 'react'
import Link from 'next/link'

export default function Procurement(pProps) {
  return (
    <div className='tempContainer' >
      <Link href='/procurement/po' >
        <a className="tempBox">POs</a>
      </Link>
      <Link href='/procurement/mwo'>
        <a className="tempBox">MWOs</a>
      </Link>
    </div>
  )
}
