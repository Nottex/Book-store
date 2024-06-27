import { useEffect } from 'react'
import './index.scss'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { SearchForm } from '../searchForm'
import { useAppSelector } from '../../types/hooks'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage'
import { getFavouritesFromLocalStorage } from '../../utils/getFavouritesFromLocalStorage'

export function Header () {
  const books = useAppSelector(state => state.books.list)
  const bookState = useAppSelector(state => state.book)

  const cart = getCartFromLocalStorage()
  const favourites = getFavouritesFromLocalStorage()

  useEffect(() => {

  }, [books, bookState])

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <NavLink className="navbar__logo__link" to="/">Bookstore</NavLink>
      </div>
      <SearchForm />
      <div className="navbar__features">
        <div className="features__favourites">
          <NavLink className="features-icon" to="/favourites"><FaRegHeart /></NavLink>
          <span className="features-icon__counter">{favourites ? favourites.length : 0}</span>
        </div>
        <div className="features__cart">
          <NavLink className="features-icon" to="/cart"><MdOutlineShoppingCart /></NavLink>
          <span className="features-icon__counter">{cart ? cart.length : 0}</span>
        </div>
      </div>
    </header>
  )
}
