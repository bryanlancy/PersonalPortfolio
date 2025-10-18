'use client'

import React from 'react'
import styles from './LoadingScreen.module.scss'
import { cn } from '@/utils/react'

interface LoadingScreenProps {
	progress: number
	isExiting: boolean
	exitAnimationDuration: number
}

export default function LoadingScreen({
	progress,
	isExiting,
	exitAnimationDuration,
}: LoadingScreenProps) {
	return (
		<div
			className={cn(styles.loadingScreen, [isExiting, styles.exiting])}
			style={
				{
					'--exitAnimationDuration': `${exitAnimationDuration}ms`,
				} as React.CSSProperties
			}>
			{/* Left Panel */}
			<div
				className={cn(styles.panel, styles.leftPanel, [
					isExiting,
					styles.exiting,
				])}
			/>

			{/* Right Panel */}
			<div
				className={cn(styles.panel, styles.rightPanel, [
					isExiting,
					styles.exiting,
				])}
			/>

			{/* Content overlay */}
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
