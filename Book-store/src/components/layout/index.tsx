import { BooksList } from '../booksList'
import { Container } from '../container'
import { Footer } from '../footer'
import { Header } from '../header'
import { Title } from '../title'

export function Layout () {
  return (
    <>
      <Container>
        <Header />
        <Title>Hello world!</Title>
        <BooksList />
        <Footer />
      </Container>
    </>
  )
}
