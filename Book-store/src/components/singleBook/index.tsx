import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchBook } from '../../redux/book-slice'
import { fetchNewBooks, toggleFavouriteById, addBookToCart } from '../../redux/books-slice'
import { IoStar } from 'react-icons/io5'
import { FaLongArrowAltLeft, FaRegHeart } from 'react-icons/fa'
import { Title } from '../title'
import { RootState } from '../../redux/store'
import { IBook } from '../../types/interfaces'
import { MdFavorite } from 'react-icons/md'
import './index.scss'

export function SingleBook () {
  const { bookId } = useParams()
  const book = useAppSelector((state: RootState) => state.book.data)
  const books = useAppSelector((state: RootState) => state.books.list)

  const favourites = useAppSelector((state: RootState) => state.books.favourites)
  const booksInCart = useAppSelector((state: RootState) => state.books.cart)

  const [activeTab, setActiveTab] = useState('description')

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
  }, [bookId, dispatch, books.length])

  if (!book) {
    return (
      <div>Loading...</div>
    )
  }

  function handleClickToggleFavourites () {
    dispatch(toggleFavouriteById(bookId))
  }

  function handleClickAddToCart () {
    dispatch(addBookToCart(bookId))
  }

  function displayFavouriteIcon () {
    if (favourites && favourites.length > 0) {
      const bookInFavourites: undefined | IBook = favourites.find((item: IBook) => item.id === book.id)
      if (bookInFavourites) {
        return <MdFavorite className="book-icon" onClick={handleClickToggleFavourites}/>
      } else {
        return <FaRegHeart className="book-icon" onClick={handleClickToggleFavourites}/>
      }
    } else {
      return <FaRegHeart className="book-icon" onClick={handleClickToggleFavourites}/>
    }
  }

  function renderTabContent () {
    switch (activeTab) {
      case 'description':
        return <p>{book.desc}</p>
      case 'authors':
        return <p>{book.authors}</p>
      case 'publisher':
        return <p>{book.publisher}</p>
      default:
        return null
    }
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
              {displayFavouriteIcon()}
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
          <nav className="single-book__about-nav">
            <button className={activeTab === 'description' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('description')}>
              Description
            </button>
            <button className={activeTab === 'authors' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('authors')}>
              Authors
            </button>
            <button className={activeTab === 'publisher' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('publisher')}>
              Publisher
            </button>
          </nav>
          <div className="single-book__about__description">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  )
}
