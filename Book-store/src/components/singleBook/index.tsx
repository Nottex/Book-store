import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { addBookToCart, fetchBook } from '../../redux/book-slice'
import { fetchNewBooks, toggleFavouriteById } from '../../redux/books-slice'
import { IoStar } from 'react-icons/io5'
import { FaLongArrowAltLeft, FaRegHeart } from 'react-icons/fa'
import { Title } from '../title'
import { RootState } from '../../redux/store'
import './index.scss'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage'
import { IBook } from '../../types/interfaces'

export function SingleBook () {
  const { bookId } = useParams()
  const book = useAppSelector((state: RootState) => state.book.data)
  const books = useAppSelector((state: RootState) => state.books.list)
  const booksInCart = getCartFromLocalStorage()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function checkButton () {
    if (booksInCart && booksInCart.length > 0) {
      const bookInCart: undefined | IBook = booksInCart.find((book: IBook) => book.id === bookId)
      if (bookInCart) {
        return true
      }
    } else {
      return false
    }
  }

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
      <NavLink to={'..'} className="arrow-back" onClick={(e) => {
        e.preventDefault()
        navigate(-1)
      }}
      ><FaLongArrowAltLeft /></NavLink>
      <div className="single-book__card">
        <div className="single-book__card__header">
          <div className="single-book__card__image">
            <div className="single-book__image__icon">
              <FaRegHeart className="book-icon" onClick={handleClickToggleFavourites}/>
            </div>
            <img src={book.image} alt="" />
          </div>
          <div className="single-book__card__info">
            <div className="single-book__info__price">
              <span className="single-book__info-price">{book.price}</span>
              <span className="single-book__features__rating">{book.rating}<IoStar /></span>
            </div>
            <div className="single-book__info-about">
              <div className="single-book__info-about__fields">
                <span>Authors</span>
                <span>Publisher</span>
                <span>Pages</span>
                <span>Year</span>
              </div>
              <div className="single-book__info-about__values">
                <span>{book.authors}</span>
                <span>{book.publisher}</span>
                <span>{book.pages}</span>
                <span>{book.year}</span>
              </div>
            </div>
            <button className="single-book__info__cart-btn" disabled={checkButton()} onClick={handleClickAddToCart}>Add to cart</button>
          </div>
        </div>
        <div className="single-book__card__about">
          <span className="single-book__about__description">{book.desc}</span>
        </div>
      </div>
    </>
  )
}
