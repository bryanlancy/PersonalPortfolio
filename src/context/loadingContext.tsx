'use client'

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react'

interface LoadingContextType {
	isLoading: boolean
	setLoading: (loading: boolean) => void
	isInitialLoad: boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

interface LoadingProviderProps {
	children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [isInitialLoad, setIsInitialLoad] = useState(true)

	const setLoading = (loading: boolean) => {
		setIsLoading(loading)
		if (!loading && isInitialLoad) {
			// First load is complete
			setIsInitialLoad(false)
		}
	}

	// Auto-hide loading after a maximum time to prevent infinite loading
	useEffect(() => {
		const maxLoadTime = setTimeout(() => {
			if (isLoading) {
				setLoading(false)
			}
		}, 10000) // 10 second maximum

		return () => clearTimeout(maxLoadTime)
	}, [isLoading])

	return (
		<LoadingContext.Provider
			value={{ isLoading, setLoading, isInitialLoad }}>
			{children}
		</LoadingContext.Provider>
	)
}

export function useLoading() {
	const context = useContext(LoadingContext)
	if (context === undefined) {
		throw new Error('useLoading must be used within a LoadingProvider')
	}
	return context
}
