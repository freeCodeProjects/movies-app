import { ReactElement, createContext, useState } from 'react'
import { QueryCache } from '../types'

const useValue = () => {
	const [queryCache, setQueryCache] = useState<QueryCache>({})

	return {
		queryCache,
		setQueryCache
	}
}

export const QueryCacheContext = createContext(
	{} as ReturnType<typeof useValue>
)

const QueryCacheContextProvider = ({
	children
}: {
	children: ReactElement
}) => {
	return (
		<QueryCacheContext.Provider value={useValue()}>
			{children}
		</QueryCacheContext.Provider>
	)
}
export default QueryCacheContextProvider
