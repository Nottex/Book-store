import React from 'react'
import './index.scss'

export function Container ({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-main">{children}</div>
  )
}
