'use client'

import React, { useEffect, useState } from 'react'
import { useLoading } from '@/context/loadingContext'
import LoadingScreen from './LoadingScreen'
import { preventScroll, enableScroll } from '@/utils/general'

interface ClientLoaderProps {
	children: React.ReactNode
}

export default function ClientLoader({ children }: ClientLoaderProps) {
	const { isLoading, setLoading } = useLoading()
	const [progress, setProgress] = useState(0)
	const [isExiting, setIsExiting] = useState(false)

	const minimumLoadTime = 2000
	const exitAnimationDuration = 2000

	// Handle progress and exit logic - only run when isLoading is true
	useEffect(() => {
		if (!isLoading) return

		// Prevent scrolling when loading starts
		preventScroll()

		let progressInterval: NodeJS.Timeout
		let loadTimeout: NodeJS.Timeout
		let gsapCheckTimeout: NodeJS.Timeout

		// Simulate progress loading
		const startTime = Date.now()
		progressInterval = setInterval(() => {
			const elapsed = Date.now() - startTime
			const progressPercent = Math.min(
				(elapsed / minimumLoadTime) * 100,
				100
			)
			setProgress(progressPercent)
		}, 50)

		// Ensure minimum load time and wait for GSAP to be ready
		const checkIfReady = () => {
			const elapsed = Date.now() - startTime
			const remainingTime = Math.max(0, minimumLoadTime - elapsed)

			loadTimeout = setTimeout(() => {
				// Start exit animation after showing 100% progress
				setTimeout(() => {
					setIsExiting(true)

					// Handle exit animation timing
					setTimeout(() => {
						setLoading(false)
					}, exitAnimationDuration)
				}, 500) // Give time to see 100% progress
			}, remainingTime)
		}

		// Start the loading process after a short delay
		gsapCheckTimeout = setTimeout(() => {
			checkIfReady()
		}, 100)

		return () => {
			clearInterval(progressInterval)
			clearTimeout(loadTimeout)
			clearTimeout(gsapCheckTimeout)
		}
	}, [isLoading, minimumLoadTime, exitAnimationDuration, setLoading])

	// Handle scroll re-enabling when loading completes
	useEffect(() => {
		if (!isLoading) {
			// Re-enable scrolling when loading is complete
			enableScroll()
		}
	}, [isLoading])

	return (
		<>
			{children}
			{isLoading && (
				<LoadingScreen
					progress={progress}
					isExiting={isExiting}
					exitAnimationDuration={exitAnimationDuration}
				/>
			)}
		</>
	)
}
