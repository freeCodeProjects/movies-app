import { useEffect, useState } from 'react'

const useFetch = (url: string) => {
	const [data, setData] = useState(null)
	const [error, setError] = useState('')
	const [isPending, setIsPending] = useState(true)

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal
		fetchRequest(url, signal)
		return () => controller.abort()
	}, [url])

	const fetchRequest = async (url: string, signal: AbortSignal) => {
		try {
			setIsPending(true)
			const res = await fetch(url, { signal })
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.status_message)
			} else {
				setData(data)
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

	return { isPending, data, error }
}

export default useFetch
