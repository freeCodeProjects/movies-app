import { useContext, useEffect, useState } from 'react'
import { InfiniteQueryCacheContext } from '../contexts/InfiniteQueryCacheContext'

const useInfiniteFetch = (key: string, url: string) => {
	const [data, setData] = useState<null | object[]>(null)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const { queryCache, setQueryCache } = useContext(InfiniteQueryCacheContext)

	const isValidCache =
		(key in queryCache && queryCache[key].expireAt > Date.now()) || false

	console.log('isValidCache : ', isValidCache)

	useEffect(() => {
		if (!isValidCache) {
			console.log('fetching new')
			const controller = new AbortController()
			const signal = controller.signal
			fetchRequest(url, signal)
			return () => controller.abort()
		}
	}, [url])

	const fetchRequest = async (url: string, signal: AbortSignal) => {
		try {
			setIsLoading(true)
			const res = await fetch(url, { signal })
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.status_message)
			} else {
				setData([data])
				setQueryCache((prevData) => ({
					...prevData,
					[key]: {
						response: [data],
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
			setIsLoading(false)
		}
	}

	const fetchMore = async (url: string) => {
		try {
			setIsLoadingMore(true)
			const res = await fetch(url)
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.status_message)
			} else {
				setData((prevData) => {
					prevData?.push(data)
					return prevData
				})
				setQueryCache((prevData) => {
					prevData[key].response.push(data)
					return prevData
				})
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
			setIsLoadingMore(false)
		}
	}

	if (isValidCache) {
		return {
			isLoading: false,
			data: queryCache[key].response,
			error,
			fetchMore,
			isLoadingMore
		}
	}

	return { isLoading, data, error, fetchMore, isLoadingMore }
}

export default useInfiniteFetch
