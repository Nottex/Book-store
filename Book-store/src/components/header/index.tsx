import { JSX } from 'react'
import './index.scss'
import { IoIosSearch } from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'

export function Header (): JSX.Element {
  return (
    <header className="header">
      <div className="header__logo">Bookstore</div>
      <form className="header__search-form">
        <input type="search" id="search-form__input" placeholder="Book name" />
        <IoIosSearch className="search-form__icon" />
      </form>
      <div className="header__features">
        <FaRegHeart />
        <MdOutlineShoppingCart />
      </div>
    </header>
  )
}
