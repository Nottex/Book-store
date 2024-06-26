import { NavLink } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import './index.scss'
import { useAppDispatch } from '../../types/hooks'
import { addBookToCart } from '../../redux/book-slice'
import { toggleFavouriteById } from '../../redux/books-slice'

interface Props {
  id: string,
  image: string,
  title: string,
  info: string,
  price: string
}

export function BookCard (props: Props) {
  const dispatch = useAppDispatch()

  function handleClickToogleFavourite () {
    dispatch(toggleFavouriteById(props.id))
  }

  // Не работает, т.к. обработчик на одну книгу, а не на массив
  function handleClickAddToCart () {
    dispatch(addBookToCart(props.id))
  }

  function displayFavourite () {
    if (props.isFavorite) {
      return null
    } else {
      <FaRegHeart className="book-icon" onClick={handleClickToogleFavourite}/>
    }
  }

  return (
    <div className="book-card">
      <div className="book-card__image">
        <div className="book-card__icons">
          {/* {displayFavourite()} */}
          <FaRegHeart className="book-icon" onClick={handleClickToogleFavourite}/>
          <MdOutlineShoppingCart className="book-icon" onClick={handleClickAddToCart}/>
        </div>
        <img src={props.image} alt="" />
      </div>
      <NavLink className="card-link" to={`/book/${props.id}`}>
        <h3 className="book-card__title">{props.title}</h3>
      </NavLink>
      <span className="book-card__info">{props.info}</span>
      <div className="book-card__features">
        <span className="book-card__features__price">{props.price}</span>
        <span className="book-card__features__rating">5 stars</span>
      </div>
    </div>
  )
}
