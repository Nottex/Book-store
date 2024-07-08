import { NavLink } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart, MdFavorite } from 'react-icons/md'
import { useAppDispatch } from '../../types/hooks'
import { toggleFavouriteById, addBookToCart } from '../../redux/books-slice'
import { IBookCard, IBook } from '../../types/interfaces'
import { BsCartCheckFill } from 'react-icons/bs'
import './index.scss'
import { getFavouritesFromLocalStorage } from '../../utils/getFavouritesFromLocalStorage'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage'

export function BookCard (props: IBookCard) {
  const dispatch = useAppDispatch()
  const favourites = getFavouritesFromLocalStorage()
  const cart = getCartFromLocalStorage()

  function handleClickToggleFavourite () {
    dispatch(toggleFavouriteById(props.id))
  }

  function handleClickAddToCart () {
    dispatch(addBookToCart(props.id))
  }

  function displayFavouriteIcon () {
    if (favourites && favourites.length > 0) {
      const bookInFavourites: undefined | IBook = favourites.find((book: IBook) => book.id === props.id)
      if (bookInFavourites) {
        return <MdFavorite className="book-icon" onClick={handleClickToggleFavourite}/>
      } else {
        return <FaRegHeart className="book-icon" onClick={handleClickToggleFavourite}/>
      }
    } else {
      return <FaRegHeart className="book-icon" onClick={handleClickToggleFavourite}/>
    }
  }

  function displayCartIcon () {
    if (cart && cart.length > 0) {
      const bookInCart: undefined | IBook = cart.find((book: IBook) => book.id === props.id)
      if (bookInCart) {
        return <BsCartCheckFill className="book-icon" disabled={true} />
      } else {
        return <MdOutlineShoppingCart className="book-icon" onClick={handleClickAddToCart}/>
      }
    } else {
      return <MdOutlineShoppingCart className="book-icon" onClick={handleClickAddToCart}/>
    }
  }

  return (
    <div className="book-card">
      <div className="book-card__image">
        <div className="book-card__icons">
          {displayFavouriteIcon()}
          {displayCartIcon()}
        </div>
        <img src={props.image} alt="" />
      </div>
      <NavLink className="card-link" to={`/book/${props.id}`}>
        <h3 className="book-card__title">{props.title}</h3>
      </NavLink>
      <span className="book-card__info">{props.info}</span>
      <div className="book-card__features">
        <span className="book-card__features__price">{props.price}</span>
      </div>
    </div>
  )
}
