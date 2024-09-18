import { client } from '../api/client'
import { newBooksEndpoint, searchEndpoint, singleBookEndpoint } from '../api/endpoints'

async function requestNewBooks (params = {}) {
  const { data } = await client.get(newBooksEndpoint, { params })

  return data
}

async function requestBook (id: string | undefined) {
  const { data } = await client.get(`${singleBookEndpoint}${id}`)

  return data
}

async function requestSearchBooks (query: string | undefined, page: string | undefined | number) {
  const { data } = await client.get(`${searchEndpoint}${query}/${page}`)

  return data
}

export { requestNewBooks, requestBook, requestSearchBooks }
