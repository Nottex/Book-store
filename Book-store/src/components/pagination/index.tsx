import { useParams, NavLink } from 'react-router-dom'
import { useAppSelector } from '../../types/hooks'
import { buildPaginationScheme } from '../../utils/buildPaginationScheme'
import './index.scss'

export function Pagination (props) {
  const { page: currentPage } = useParams()
  const pagesCount = useAppSelector(state => state.books.pagesCount)

  if (!pagesCount) return null

  const paginationScheme = buildPaginationScheme(currentPage, pagesCount)

  return (
    <ul className="pagination">
      {paginationScheme.map((item, index) => {
        if (item === '...') {
          return (
            <li className="page-item" key={index}>
              <span className="page-link">...</span>
            </li>
          )
        }

        return (
          <li className="page-item" key={index}>
            <NavLink className="page-link" to={`/books/search/${props.route}${item}`}>
              {item}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
