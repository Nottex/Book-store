import { useAppDispatch, useAppSelector } from '../types/hooks'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Title } from '../components/title'
import { fetchBook } from '../redux/book-slice'

export function Book () {
  const { bookId } = useParams()
  const book = useAppSelector(state => state.book.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBook(bookId))
  }, [bookId, dispatch])

  if (!book) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <Title>{book.title}</Title>
      <div className="post-image">
        <img src={book.image} alt="" />
      </div>
      <span className="post-description">{book.desc}</span>
    </>
  )
}
