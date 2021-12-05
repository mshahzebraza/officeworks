import React from 'react'
import POdetail from './POdetail'

export default function POlist(props) {

  return (
    <>
      {props.data.map((itemData, idx) => {
        return <POdetail
          key={idx}
          // itemKey={idx}
          data={itemData}
        />
      })}
    </>
  )
}
