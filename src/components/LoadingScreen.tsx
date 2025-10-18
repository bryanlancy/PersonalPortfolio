'use client'

import React, { useEffect, useState } from 'react'
import styles from './LoadingScreen.module.scss'

interface LoadingScreenProps {
	onLoadComplete?: () => void
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
	const [isVisible, setIsVisible] = useState(true)
	const [isExiting, setIsExiting] = useState(false)
	const [progress, setProgress] = useState(0)

	const minimumLoadTime = 4000
	const exitAnimationDuration = 3000

	// Handle exit animation timing
	useEffect(() => {
		if (isExiting) {
			const timer = setTimeout(() => {
				setIsVisible(false)
				onLoadComplete?.()
			}, exitAnimationDuration)

			return () => clearTimeout(timer)
		}
	}, [isExiting, exitAnimationDuration, onLoadComplete])

	useEffect(() => {
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
				// Final progress update

				// Start exit animation after showing 100% progress
				setTimeout(() => {
					setProgress(100)
					setIsExiting(true)
					// Exit animation timing is handled by the useEffect above
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
	}, [minimumLoadTime, onLoadComplete])

	if (!isVisible) return null

	return (
		<div
			className={`${styles.loadingScreen} ${
				isExiting ? styles.exiting : ''
			}`}
			style={
				{
					'--exitAnimationDuration': `${exitAnimationDuration}ms`,
				} as React.CSSProperties
			}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<div className={styles.logoText}>Bryan Burns</div>
					<div className={styles.logoSubtext}>Software Engineer</div>
				</div>

				<div className={styles.progressContainer}>
					<div className={styles.progressBar}>
						<div
							className={styles.progressFill}
							style={{ width: `${progress}%` }}
						/>
					</div>
					<div className={styles.progressText}>
						{Math.round(progress)}%
					</div>
				</div>

				<div className={styles.loadingDots}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	)
}
