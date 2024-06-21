import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout'
import { Main } from './pages/Main'
import { Book } from './pages/Book'

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
      }
    ]
  }
])
