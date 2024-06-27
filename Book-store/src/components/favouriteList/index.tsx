import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { fetchNewBooks } from '../../redux/books-slice'
import { NavLink, useNavigate } from 'react-router-dom'
import { getFavouritesFromLocalStorage } from '../../utils/getFavouritesFromLocalStorage'
import { BookCardSmall } from '../bookCardSmall'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { IBook } from '../../types/interfaces'

export function FavouriteList () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const books = useAppSelector(state => state.books.list)
  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  const favouriteBooks = getFavouritesFromLocalStorage()

  useEffect(() => {
    if (books.length > 0) return

    dispatch(fetchNewBooks())
  }, [dispatch, favouriteBooks, books])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    if (favouriteBooks && favouriteBooks.length > 0) {
      return favouriteBooks.map((book: IBook) =>
        <BookCardSmall
          key={book.id}
          id={book.id}
          title={book.title}
          info={book.subtitle}
          image={book.image}
          price={book.price}
          isFavourite={book.isFavourite}
          rating={book.rating}
       />)
    } else {
      return <div>0 favourite books</div>
    }
  }

  return (
    <>
      <NavLink to={'..'} className="arrow-back" onClick={(e) => {
        e.preventDefault()
        navigate(-1)
      }}
      ><FaLongArrowAltLeft /></NavLink>
      <div className="cards__wrapper">
        {renderBooks()}
      </div>
    </>
  )
}
