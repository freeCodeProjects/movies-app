import { useContext, useEffect, useState } from 'react'
import { QueryCacheContext } from '../contexts/QueryCacheContext'

const useFetch = (key: string, url: string) => {
	const [data, setData] = useState(null)
	const [error, setError] = useState('')
	const [isPending, setIsPending] = useState(true)
	const [startFetching, setStartFetching] = useState(false)
	const { queryCache, setQueryCache } = useContext(QueryCacheContext)

	const isValidCache =
		(key in queryCache && queryCache[key].expireAt > Date.now()) || false

	useEffect(() => {
		if (!isValidCache) {
			setStartFetching(true)
		}
		if (startFetching) {
			const controller = new AbortController()
			const signal = controller.signal
			fetchRequest(url, signal)
			return () => controller.abort()
		}
	}, [url, startFetching])

	const fetchRequest = async (url: string, signal: AbortSignal) => {
		try {
			setIsPending(true)
			const res = await fetch(url, { signal })
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.status_message)
			} else {
				setData(data)
				setQueryCache((prevData) => ({
					...prevData,
					[key]: {
						response: data,
						expireAt: Date.now() + 86400000
					}
				}))
			}
		} catch (error) {
			if (error instanceof Error) {
				if (error.name !== 'AbortError') {
					setError(error.message)
				}
			} else {
				setError(String(error))
			}
		} finally {
			setIsPending(false)
		}
	}

	if (isValidCache) {
		return { isPending: false, data: queryCache[key].response }
	}

	return { isPending, data, error }
}

export default useFetch
