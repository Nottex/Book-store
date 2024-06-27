import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { BookCard } from '../bookCard'
import './index.scss'
import { fetchNewBooks } from '../../redux/books-slice'
import { IBook } from '../../types/interfaces'

export function BooksList () {
  const dispatch = useAppDispatch()

  const books = useAppSelector(state => state.books.list)

  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  useEffect(() => {
    if (books.length > 0) return

    dispatch(fetchNewBooks())
  }, [dispatch, books])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    return books.map((book:IBook) => <BookCard key={book.isbn13} id={book.isbn13} title={book.title} info={book.subtitle} image={book.image} price={book.price} />)
  }

  return (
    <div className="book-cards__wrapper">
      {renderBooks()}
    </div>
  )
}
