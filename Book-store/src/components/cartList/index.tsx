import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../types/hooks'
import { removeBookFromCart } from '../../redux/book-slice'
import { BookCardSmall } from '../bookCardSmall'
import { BookCard } from '../bookCard'
import { useEffect, useState } from 'react'
import { fetchNewBooks } from '../../redux/books-slice'

export function CartList () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const bookState = useAppSelector(state => state.book)

  // Пока не работает зависимость от books
  // const books = useAppSelector(state => state.books.list)

  const [totalPriceCounter, setTotalPriceCounter] = useState(0)

  const getCartFromStorage = () => {
    const cart = localStorage.getItem('cart')

    return JSON.parse(cart)
  }

  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  const booksFromCart = getCartFromStorage()

  // useEffect(() => {
  //   if (books.length > 0) return
  //   console.log(books)

  //   dispatch(fetchNewBooks())
  //   totalPriceValue()
  // }, [books, dispatch])

  useEffect(() => {
  }, [bookState])

  function totalPriceValue () {
    let totalPrice = 0
    booksFromCart.forEach(book => {
      totalPrice += Number(book.price.slice(1))
    })
    setTotalPriceCounter(totalPrice)
  }

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    if (booksFromCart && booksFromCart.length > 0) {
      return booksFromCart.map((book) => <BookCardSmall key={book.id} id={book.id} title={book.title} info={book.subtitle} image={book.image} price={book.price} />)
    } else {
      return <div>0 Books in cart</div>
    }

    // if (booksFromCart) {
    //   return booksFromCart.map((book) => {
    //     if (book.inCart === true) {
    //       return <BookCard key={book.isbn13} id={book.isbn13} title={book.title} info={book.subtitle} image={book.image} price={book.price} />
    //     }
    //   })
    // } else {
    //   return <div>0 Books in cart</div>
    // }
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
        <div className="cart-counter" style={{ margin: 30, fontSize: 20 }}>
          <span>Total: ${totalPriceCounter}</span>
        </div>
        {renderBooks()}
      </div>

    </>
  )
}
