import { BookCard } from '../bookCard'
import './index.scss'

export function BooksList () {
  return (
    <div className="book-cards__wrapper">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  )
}
