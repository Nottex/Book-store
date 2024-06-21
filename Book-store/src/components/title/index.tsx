import React from 'react'
import './index.scss'

// export function Title ({ children }: {children: React.ReactNode}) {
//   return (
//     <h1 className="title">{children}</h1>
//   )
// }

export function Title (props) {
  return (
    <h1 className="title">{props.children}</h1>
  )
}
