import { useAppDispatch, useAppSelector } from '../types/hooks'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toggleFavourite, fetchBook } from '../redux/book-slice'
import { toggleFavouriteById } from '../redux/books-slice'
import { Title } from '../components/title'

export function Book () {
  const { bookId } = useParams()
  const book = useAppSelector(state => state.book.data)
  const dispatch = useAppDispatch()

  // const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    dispatch(fetchBook(bookId))
  }, [bookId, dispatch])

  if (!book) {
    return (
      <div>Loading...</div>
    )
  }

  function handleClickAddToFavorites () {
    dispatch(toggleFavourite())

    // setIsFavourite(!isFavourite)
  }

  return (
    <>
      <Title>{book.title}</Title>
      <div className="post-image">
        <img src={book.image} alt="" />
      </div>
      <span className="post-description">{book.desc}</span>
      <button style={{ margin: 32 }} onClick={handleClickAddToFavorites}>Like</button>
    </>
  )
}
