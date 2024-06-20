import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout'
import { Main } from './pages/Main'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />
      }
    ]
  }
])
