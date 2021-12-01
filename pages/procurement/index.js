import React from 'react'
import Link from 'next/link'

export default function Procurement(pProps) {
  return (
    <div>
      <Link href='/procurement/po' >POs</Link>
      <Link href='/procurement/mwo' >MWOs</Link>
    </div>
  )
}
