import { ReactElement, createContext, useState } from 'react'
import { InfiniteQueryCache } from '../types'

const useValue = () => {
	const [queryCache, setQueryCache] = useState<InfiniteQueryCache>({})

	return {
		queryCache,
		setQueryCache
	}
}

export const InfiniteQueryCacheContext = createContext(
	{} as ReturnType<typeof useValue>
)

const InfiniteQueryCacheContextProvider = ({
	children
}: {
	children: ReactElement
}) => {
	return (
		<InfiniteQueryCacheContext.Provider value={useValue()}>
			{children}
		</InfiniteQueryCacheContext.Provider>
	)
}
export default InfiniteQueryCacheContextProvider
