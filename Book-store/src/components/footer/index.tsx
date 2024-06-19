import { JSX } from 'react'
import './index.scss'

export function Footer (): JSX.Element {
  return (
    <footer className="footer">
      <span className="footer__text footer__copyright">
        ©2022 Bookstore
      </span>
      <span className="footer__text footer__info">
        All rights reserved
      </span>
    </footer>
  )
}
