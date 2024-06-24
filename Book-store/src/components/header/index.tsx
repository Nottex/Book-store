import { JSX } from 'react'
import './index.scss'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { SearchForm } from '../searchForm'

export function Header (): JSX.Element {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <NavLink className="navbar__logo__link" to="/">Bookstore</NavLink>
      </div>
      <SearchForm />
      <div className="navbar__features">
        <NavLink to="/favourites"><FaRegHeart /></NavLink>
        <NavLink to="/cart"><MdOutlineShoppingCart /></NavLink>
      </div>
    </header>
  )
}
