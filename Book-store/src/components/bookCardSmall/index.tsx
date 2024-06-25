import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../types/hooks'
import { FaRegHeart } from 'react-icons/fa'
import { removeBookFromCart } from '../../redux/book-slice'
import './index.scss'

interface PropsSmall {
  id: string,
  image: string,
  title: string,
  info: string,
  price: string
}

export function BookCardSmall (props: PropsSmall) {
  const dispatch = useAppDispatch()

  function handleClickRemoveFromCart () {
    dispatch(removeBookFromCart(props.id))
    console.log('click')
  }

  return (
    <div className="book-card-sm">
      <div className="book-card-sm__image">
        <div className="book-card-sm__icons">
          <FaRegHeart className="book-icon-sm" />
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
        <span className="book-card-sm__features__close" onClick={handleClickRemoveFromCart}>X</span>
      </div>
    </div>
  )
}
