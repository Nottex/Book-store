import { NavLink } from 'react-router-dom'
import './index.scss'

interface Props {
  id: string,
  image: string,
  title: string,
  info: string,
  price: string
}

export function BookCard (props: Props) {
  return (
    <div className="book-card">
      <div className="book-card__image">
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
