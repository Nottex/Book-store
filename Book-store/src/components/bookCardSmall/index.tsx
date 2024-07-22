import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { toggleFavouriteById, addBookToCart, countIncrement, countDecrement } from '../../redux/books-slice'
import { removeBookFromCart } from '../../redux/book-slice'
import { IBookSmallCard, IBook } from '../../types/interfaces'
import { MdFavorite, MdOutlineShoppingCart } from 'react-icons/md'
import { BsCartCheckFill } from 'react-icons/bs'
import './index.scss'

export function BookCardSmall (props: IBookSmallCard) {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.books.cart)
  const favourites = useAppSelector(state => state.books.favourites)

  function handleClickRemoveFromCart () {
    dispatch(removeBookFromCart(props.id))
  }

  function toggleFavourite () {
    dispatch(toggleFavouriteById(props.id))
  }

  function handleClickAddToCart () {
    dispatch(addBookToCart(props.id))
  }

  function displayCartIcon () {
    if (cart && cart.length > 0) {
      const bookInCart: undefined | IBook = cart.find((book: IBook) => book.id === props.id)
      if (bookInCart) {
        return <BsCartCheckFill className="book-icon-sm" disabled={true} />
      } else {
        return <MdOutlineShoppingCart className="book-icon-sm" onClick={handleClickAddToCart}/>
      }
    } else {
      return <MdOutlineShoppingCart className="book-icon-sm" onClick={handleClickAddToCart}/>
    }
  }

  function renderIcon () {
    const bookInFavourites: undefined | IBook = favourites.find((book: IBook) => book.id === props.id)
    if (bookInFavourites) {
      return <MdFavorite className="book-card-sm__features__favourite" onClick={toggleFavourite}/>
    } else {
      return <span className="book-card-sm__features__close" onClick={handleClickRemoveFromCart}>X</span>
    }
  }

  function incrementCounter () {
    dispatch(countIncrement(props.id))
  }

  function decrementCounter () {
    dispatch(countDecrement(props.id))
  }

  function renderCounter () {
    if (props.favouritePage) {
      return null
    } else {
      return <div className="book-card-sm__counter">
                <span className="counter-symbol" onClick={decrementCounter}>-</span>
                <span>{props.count}</span>
                <span className="counter-symbol" onClick={incrementCounter}>+</span>
              </div>
    }
  }

  return (
    <div className="book-card-sm">
      <div className="book-card-sm__image">
        <img src={props.image} alt="" />
        {displayCartIcon()}
      </div>
      <div className="book-card-sm__info">
        <NavLink className="card-link" to={`/book/${props.id}`}>
          <h3 className="book-card-sm__title">{props.title}</h3>
        </NavLink>
        <span className="book-card-sm__about">{props.info}</span>
        {renderCounter()}
      </div>
      <div className="book-card-sm__features">
        <span className="book-card-sm__features__price">{props.price}</span>
        {renderIcon()}
      </div>
    </div>
  )
}
