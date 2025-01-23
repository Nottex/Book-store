import React from 'react'
import './index.scss'

export function Title ({ children }: {children: React.ReactNode}) {
  return (
    <h1 className="title">{children}</h1>
  )
}
