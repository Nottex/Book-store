import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../types/hooks'
import { BookCardSmall } from '../bookCardSmall'
import { useEffect, useState } from 'react'
import { fetchNewBooks } from '../../redux/books-slice'
import { IBook, IBookSmallCard } from '../../types/interfaces'
import { FaLongArrowAltLeft } from 'react-icons/fa'

export function CartList () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const bookState = useAppSelector(state => state.book)

  const books = useAppSelector(state => state.books.list)
  const cart = useAppSelector(state => state.books.cart)

  const [totalPriceCounter, setTotalPriceCounter] = useState<string | number>(0)

  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  // const booksFromCart = getCartFromLocalStorage()

  useEffect(() => {
    totalPriceValue()

    if (books.length > 0) return

    dispatch(fetchNewBooks())
  }, [bookState, books, cart])

  function totalPriceValue () {
    let totalPrice = 0
    if (cart && cart.length > 0) {
      cart.forEach((book: IBook) => {
        totalPrice += Number(book.price.slice(1, 6)) * book.count
      })
    }
    setTotalPriceCounter(totalPrice.toFixed(2))
  }

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    if (cart && cart.length > 0) {
      return cart.map((book: IBookSmallCard) => <BookCardSmall key={book.id} id={book.id} title={book.title} info={book.subtitle} image={book.image} price={book.price} count={book.count}/>)
    } else {
      return <div>0 Books in cart</div>
    }
  }

  return (
    <>
      <NavLink to={'..'} className="arrow-back" onClick={(e) => {
        e.preventDefault()
        navigate(-1)
      }}
      ><FaLongArrowAltLeft /></NavLink>
      <div className="cart-counter" style={{ margin: 30, fontSize: 20 }}>
        <span>Total: ${totalPriceCounter}</span>
      </div>
      <div className="cards__wrapper">
        {renderBooks()}
      </div>
    </>
  )
}
