import { useAppDispatch, useAppSelector } from '../types/hooks'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toggleFavourite, addToCart, fetchBook } from '../redux/book-slice'
import { toggleFavouriteById } from '../redux/books-slice'
import { Title } from '../components/title'
import { setCartValue } from '../redux/cart-slice'

export function Book () {
  const { bookId } = useParams()
  const book = useAppSelector(state => state.book.data)
  const dispatch = useAppDispatch()

  const cartList = useAppSelector(state => state.cart.list)

  const getCartFromStorage = localStorage.getItem('cart')
  const cart = JSON.parse(getCartFromStorage)

  // const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    dispatch(fetchBook(bookId))
  }, [bookId, dispatch])

  if (!book) {
    return (
      <div>Loading...</div>
    )
  }

  function handleClickToggleFavourites () {
    dispatch(toggleFavourite())
    console.log(book.isFavourite)

    // setIsFavourite(!isFavourite)
  }

  function handleClickAddToCart () {
    dispatch(addToCart())
    dispatch(setCartValue(cart))
  }

  return (
    <>
      <Title>{book.title}</Title>
      <button style={{ margin: 15 }} onClick={handleClickAddToCart}>Cart</button>
      <div className="post-image">
        <img src={book.image} alt="" />
      </div>
      <span className="post-description">{book.desc}</span>
      <button style={{ margin: 15 }} onClick={handleClickToggleFavourites}>Like</button>

    </>
  )
}
