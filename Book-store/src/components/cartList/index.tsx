import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../types/hooks'
import { BookCard } from '../bookCard'

export function CartList () {
  const navigate = useNavigate()
  const getCartFromStorage = () => {
    const cart = localStorage.getItem('cart')

    return JSON.parse(cart)
  }

  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  const books = getCartFromStorage()

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    if (books) {
      return books.map((book) => {
        if (book.inCart === true) {
          return <BookCard key={book.isbn13} id={book.isbn13} title={book.title} info={book.subtitle} image={book.image} price={book.price} />
        }
      })
    } else {
      return <div>0 Books in cart</div>
    }
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
