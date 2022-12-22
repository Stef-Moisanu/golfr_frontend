import { getToken } from './userAuth'
import useSWR from 'swr'

const useScoresByUser = id => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/golfers/${id}`

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occured while fetching the data')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.user)
  }

  const { data, error } = useSWR(url, fetcher)

  return {
    data,
    error: error,
  }
}

export default useScoresByUser
