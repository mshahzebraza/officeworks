import React, { Children } from 'react'
import { concatStrings } from '../../helpers/reusable'

function Button({ caption = 'Button', type = 'button', click = () => { }, outerClasses = [], tooltip = '', children, ...rest }) {
  return (
    <button
      onClick={click}
      className={concatStrings([...outerClasses, tooltip && 'tooltip'])}
      {...rest}
    >
      {caption}
      {children}
      {tooltip && <span className={`tooltipContent`}>{tooltip}</span>}
    </button>
  )
}

export default Button
