import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { BookCard } from '../bookCard'

export function FavouriteList () {
  const dispatch = useAppDispatch()
  // const books = useAppSelector(state => state.books.list)
  const getBooksFromLocalStorage = () => {
    const data = localStorage.getItem('data')

    return JSON.parse(data)
  }
  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  const books = getBooksFromLocalStorage()

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    return books.map((book) => {
      if (book.isFavourite === true) {
        return <BookCard key={book.isbn13} id={book.isbn13} title={book.title} info={book.subtitle} image={book.image} price={book.price} />
      }
    })
  }

  return (
    <>
      <div className="cards__wrapper">
        {renderBooks()}
      </div>
    </>
  )
}
