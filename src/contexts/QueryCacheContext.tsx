import { ReactElement, createContext, useState } from 'react'

const useValue = () => {
	const [queryCache, setQueryCache] = useState<{ [key: string]: object }>({})

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
