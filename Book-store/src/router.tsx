import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout'
import { Main } from './pages/Main'
import { Book } from './pages/Book'
import { Favourites } from './pages/Favourites'
import { SearchResults } from './pages/SearchResults'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />
      },
      {
        path: '/book/:bookId',
        element: <Book />
      },
      {
        path: '/favourites',
        element: <Favourites />
      },
      {
        path: '/books/search/:query/page/:page',
        element: <SearchResults />
      }
    ]
  }
])
