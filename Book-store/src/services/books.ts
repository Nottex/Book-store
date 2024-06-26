import { client } from '../api/client'
import { newBooksEndpoint, searchEndpoint, singleBookEndpoint } from '../api/endpoints'

async function requestNewBooks(params = {}) {
  const { data } = await client.get(newBooksEndpoint, { params })

  return data
}

async function requestBook(id) {
  const { data } = await client.get(`${singleBookEndpoint}${id}`)

  return data
}

async function requestSearchBooks(query, page) {
  const { data } = await client.get(`${searchEndpoint}${query}/${page}`)

  return data
}

export { requestNewBooks, requestBook, requestSearchBooks }
