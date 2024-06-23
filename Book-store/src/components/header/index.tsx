import { JSX } from 'react'
import './index.scss'
import { IoIosSearch } from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

export function Header (): JSX.Element {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <NavLink className="navbar__logo__link" to="/">Bookstore</NavLink>
      </div>
      <form className="navbar__search-form">
        <input type="search" id="search-form__input" placeholder="Book name" />
        <IoIosSearch className="search-form__icon" />
      </form>
      <div className="navbar__features">
        <NavLink to="/favourites"><FaRegHeart /></NavLink>
        <NavLink to="/cart"><MdOutlineShoppingCart /></NavLink>
      </div>
    </header>
  )
}
