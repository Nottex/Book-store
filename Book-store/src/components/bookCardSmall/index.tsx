import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../types/hooks'
import { toggleFavouriteById } from '../../redux/books-slice'
import { removeBookFromCart } from '../../redux/book-slice'
import { IBookSmallCard } from '../../types/interfaces'
import { FaRegHeart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { IoStar } from 'react-icons/io5'
import './index.scss'

export function BookCardSmall (props: IBookSmallCard) {
  const dispatch = useAppDispatch()

  function handleClickRemoveFromCart () {
    dispatch(removeBookFromCart(props.id))
  }

  function toggleFavourite () {
    dispatch(toggleFavouriteById(props.id))
  }

  function renderIcon () {
    if (props.isFavourite) {
      return <MdFavorite className="book-card-sm__features__favourite" onClick={toggleFavourite}/>
    } else {
      return <span className="book-card-sm__features__close" onClick={handleClickRemoveFromCart}>X</span>
    }
  }

  return (
    <div className="book-card-sm">
      <div className="book-card-sm__image">
        <div className="book-card-sm__icons">
          <FaRegHeart className="book-icon-sm" onClick={toggleFavourite}/>
        </div>
        <img src={props.image} alt="" />
      </div>
      <div className="book-card-sm__info">
        <NavLink className="card-link" to={`/book/${props.id}`}>
          <h3 className="book-card-sm__title">{props.title}</h3>
        </NavLink>
        <span className="book-card-sm__about">{props.info}</span>
        <div className="book-card-sm__counter">
          <span>-</span>
          <span>0</span>
          <span>+</span>
        </div>
      </div>
      <div className="book-card-sm__features">
        <span className="book-card-sm__features__price">{props.price}</span>
        <span className="book-card-sm__features__rating">{props.rating}<IoStar /></span>
        {renderIcon()}
      </div>
    </div>
  )
}
