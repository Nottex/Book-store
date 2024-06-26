import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { addBookToCart, fetchBook } from '../../redux/book-slice'
import { fetchNewBooks, toggleFavouriteById } from '../../redux/books-slice'
import { IoStar } from 'react-icons/io5'
import { Title } from '../title'

export function SingleBook () {
  const { bookId } = useParams()
  const book = useAppSelector(state => state.book.data)
  const books = useAppSelector(state => state.books.list)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchNewBooks())
    }

    dispatch(fetchBook(bookId))
  }, [bookId, dispatch])

  if (!book) {
    return (
      <div>Loading...</div>
    )
  }

  function handleClickToggleFavourites () {
    dispatch(toggleFavouriteById(bookId))
  }

  function handleClickAddToCart () {
    dispatch(addBookToCart())
  }

  return (
    <>
      <Title>{book.title}</Title>
      <button style={{ margin: 15 }} onClick={handleClickAddToCart}>Cart</button>
      <div className="post-image">
        <img src={book.image} alt="" />
      </div>
      <span className="post-description">{book.desc}</span>
      <span className="book-card-sm__features__rating">{book.rating}<IoStar /></span>
      <button style={{ margin: 15 }} onClick={handleClickToggleFavourites}>Like</button>
    </>
  )
}
