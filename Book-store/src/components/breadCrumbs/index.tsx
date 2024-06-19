import React from 'react'

export function BreadCrumbs ({ children }: {children: React.ReactNode}) {
  return (
    <a href="" className="breadcrumbs">{children}</a>
  )
}
