'use client'

import React, { useEffect } from 'react'
import { useLoading } from '@/context/loadingContext'
import LoadingScreen from './LoadingScreen'

interface ClientLoaderProps {
	children: React.ReactNode
}

export default function ClientLoader({ children }: ClientLoaderProps) {
	const { isLoading, setLoading } = useLoading()

	useEffect(() => {
		// Check if GSAP and other dependencies are loaded
		const checkDependencies = () => {
			const isGSAPReady = typeof window !== 'undefined' && window.gsap
			const isDOMReady = document.readyState === 'complete'

			if (isGSAPReady && isDOMReady) {
				// Add a small delay to ensure all animations are ready
				setTimeout(() => {
					setLoading(false)
				}, 500)
			} else {
				// Check again in 100ms
				setTimeout(checkDependencies, 100)
			}
		}

		// Start checking after component mounts
		const timeoutId = setTimeout(checkDependencies, 100)

		return () => clearTimeout(timeoutId)
	}, [setLoading])

	return (
		<>
			{isLoading && (
				<LoadingScreen onLoadComplete={() => setLoading(false)} />
			)}
			<div
				style={{
					// opacity: isLoading ? 0 : 1,
					// transition: 'opacity 0.5s ease-out',
					pointerEvents: isLoading ? 'none' : 'auto',
				}}>
				{children}
			</div>
		</>
	)
}
