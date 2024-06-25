import { JSX, useEffect, useState } from 'react'
import './index.scss'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { SearchForm } from '../searchForm'
import { setCartValue } from '../../redux/cart-slice'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { addToCart } from '../../redux/book-slice'

// export function Header () {
//   const [favourites, setFavourites] = useState(null)

//   const cartList = useAppSelector(state => state.cart.list)

//   const getCartFromStorage = localStorage.getItem('cart')
//   const cart = JSON.parse(getCartFromStorage)

//   function displayFavouritesCircle () {

//   }

//   useEffect(() => {

//   }, [cart])

//   function displayCartValue () {
//     if (cart && cart.length > 0) {
//       console.log('11')

//       return cart.length
//     } else {
//       return 0
//     }
//   }

//   return (
//     <header className="navbar">
//       <div className="navbar__logo">
//         <NavLink className="navbar__logo__link" to="/">Bookstore</NavLink>
//       </div>
//       <SearchForm />
//       <div className="navbar__features">
//         <div className="features__favourites">
//           <NavLink className="features-icon" to="/favourites"><FaRegHeart /></NavLink>
//           <div className="feature-icon__circle"></div>
//         </div>
//         <div className="features__cart">
//           <NavLink className="features-icon" to="/cart"><MdOutlineShoppingCart /></NavLink>
//           {/* Рабочий способ */}
//           {/* <span className="features-icon__counter">{cart.length}</span> */}
//           <span className="features-icon__counter">{cart ? cart.length : 0}</span>
//         </div>
//       </div>
//     </header>
//   )
// }

export function Header () {
  const cartList = useAppSelector(state => state.cart.list)

  const [counter, setCounter] = useState(null)

  const getCartFromStorage = localStorage.getItem('cart')
  const cart = JSON.parse(getCartFromStorage)

  function displayFavouritesCircle () {

  }

  useEffect(() => {
    setCounter(cartList.length)
  }, [cartList])

  function displayCartValue () {
    if (cart && cart.length > 0) {
      console.log('11')

      return cart.length
    } else {
      return 0
    }
  }

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <NavLink className="navbar__logo__link" to="/">Bookstore</NavLink>
      </div>
      <SearchForm />
      <div className="navbar__features">
        <div className="features__favourites">
          <NavLink className="features-icon" to="/favourites"><FaRegHeart /></NavLink>
          <div className="feature-icon__circle"></div>
        </div>
        <div className="features__cart">
          <NavLink className="features-icon" to="/cart"><MdOutlineShoppingCart /></NavLink>
          <span className="features-icon__counter">{counter}</span>
        </div>
      </div>
    </header>
  )
}
