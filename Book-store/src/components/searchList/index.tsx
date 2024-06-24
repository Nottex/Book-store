import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchSearchBooks } from '../../redux/books-slice'
import { BookCard } from '../bookCard'
import { Title } from '../title'
import { Pagination } from '../pagination'

export function SearchList () {
  const dispatch = useAppDispatch()
  const { query, page: currentPage } = useParams()
  const books = useAppSelector(state => state.books.list)
  const error = useAppSelector(state => state.books.error)
  const isLoading = useAppSelector(state => state.books.isLoading)

  useEffect(() => {
    dispatch(fetchSearchBooks({ query, page: currentPage || 1 }))
  }, [query, dispatch, currentPage])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    return books.map(book =>
      <BookCard
        key={book.id}
        id={book.id}
        title={book.title}
        price={book.price}
        image={book.image}
      />)
  }

  if (books.length === 0) {
    return (
      <div>Results not founds</div>
    )
  }

  return (
    <>
      <Title>Search results for «{query}»</Title>
      <div className="cards__wrapper">
        {renderBooks()}
      </div>
      <Pagination route={`${query}/page/`} />
    </>
  )
}
