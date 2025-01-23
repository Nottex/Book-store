import { Outlet } from 'react-router-dom'
import { Container } from '../container'
import { Footer } from '../footer'
import { Header } from '../header'

export function Layout () {
  return (
    <>
      <Container>
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </>
  )
}
