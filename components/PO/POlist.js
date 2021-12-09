import React from 'react'
import POsummary from './POsummary'

export default function POlist(props) {

  return (
    <>
      {props.data.map((itemData, idx) => {
        return <POsummary
          key={idx}
          // itemKey={idx}
          data={itemData}
          dataIndex={idx}
        />
      })}
    </>
  )
}
