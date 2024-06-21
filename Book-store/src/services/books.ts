import { client } from '../api/client'
import { newBooksEndpoint } from '../api/endpoints'

async function requestNewBooks (params = {}) {
  const { data } = await client.get(newBooksEndpoint, { params })

  return data
}

export { requestNewBooks }
