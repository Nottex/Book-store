import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { BookCard } from '../bookCard'
import './index.scss'
import { fetchNewBooks } from '../../redux/books-slice'

export function BooksList () {
  const dispatch = useAppDispatch()
  // const booksFromStore = useAppSelector(state => state.books.list)
  const books = useAppSelector(state => state.books.list)
  // const getBooksFromLocalStorage = () => {
  //   const data = localStorage.getItem('data')

  //   return JSON.parse(data)
  // }
  // const booksFromLocalStorage = getBooksFromLocalStorage()

  // const books = checkBooks()

  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  useEffect(() => {
    // console.log(books)

    if (books.length > 0) return

    dispatch(fetchNewBooks())
  }, [dispatch, books])

  // function checkBooks () {
  //   if (booksFromLocalStorage?.length > 0) {
  //     return booksFromLocalStorage
  //   } else {
  //     return booksFromStore
  //   }
  // }

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    // return books.map(book => <BookCard key={book.isbn13} id={book.isbn13} title={book.title} info={book.subtitle} image={book.image} price={book.price} />)
    return (
      books.map(book => <BookCard key={book.isbn13} id={book.isbn13} title={book.title} info={book.subtitle} image={book.image} price={book.price} />)
    )
  }

  return (
    <div className="book-cards__wrapper">
      {renderBooks()}
    </div>
  )
}
