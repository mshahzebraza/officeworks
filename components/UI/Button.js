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
