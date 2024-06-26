import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { fetchNewBooks } from '../../redux/books-slice'
import { NavLink, useNavigate } from 'react-router-dom'
import { BookCardSmall } from '../bookCardSmall'

export function FavouriteList () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const books = useAppSelector(state => state.books.list)
  const getBooksFromLocalStorage = () => {
    const favouritesBooks = localStorage.getItem('favourites')

    return JSON.parse(favouritesBooks)
  }
  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  const favouriteBooks = getBooksFromLocalStorage()

  useEffect(() => {
    if (books.length > 0) return

    dispatch(fetchNewBooks())
  }, [dispatch, books])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    if (favouriteBooks && favouriteBooks.length > 0) {
      return favouriteBooks.map((book) => <BookCardSmall key={book.id} id={book.id} title={book.title} info={book.subtitle} image={book.image} price={book.price} isFavourite={book.isFavourite} />)
    } else {
      return <div>0 favourite books</div>
    }
    // return books.map((book) => {
    //   if (book.isFavourite === true) {
    //     return <BookCardSmall key={book.isbn13} id={book.isbn13} title={book.title} info={book.subtitle} image={book.image} price={book.price} />
    //   }
    // })
  }

  return (
    <>
      <NavLink to={'..'}
        onClick={(e) => {
          e.preventDefault()
          navigate(-1)
        }}
      >
        Go back (-1)</NavLink>
      <div className="cards__wrapper">
        {renderBooks()}
      </div>
    </>
  )
}
