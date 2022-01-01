import React from 'react'
import { concatStrings } from '../../helpers/reusable'

function Button({ caption = 'Button', type = 'button', click = () => { }, styleArr = [], ...rest }) {
  return (
    <button
      onClick={click}
      className={concatStrings(styleArr)}
      {...rest}
    >
      {caption}
    </button>
  )
}

export default Button



export function buttonGenerator(caption = 'Button', click = () => { }, styleArr = [], btnDataKey) {
  return <button
    key={btnDataKey}
    onClick={click}
    className={concatStrings(styleArr)}
  >
    {caption}
  </button>
}