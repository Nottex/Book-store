import { NavLink } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useAppDispatch } from '../../types/hooks'
import { toggleFavouriteById, addBookToCart } from '../../redux/books-slice'
import { IBookCard } from '../../types/interfaces'
import './index.scss'

export function BookCard (props: IBookCard) {
  const dispatch = useAppDispatch()

  function handleClickToogleFavourite () {
    dispatch(toggleFavouriteById(props.id))
  }

  function handleClickAddToCart () {
    dispatch(addBookToCart(props.id))
  }

  // function displayFavourite () {
  //   if (props.isFavorite === true) {
  //     return null
  //   } else {
  //     <FaRegHeart className="book-icon" onClick={handleClickToogleFavourite}/>
  //   }
  // }

  return (
    <div className="book-card">
      <div className="book-card__image">
        <div className="book-card__icons">
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
      </div>
    </div>
  )
}
