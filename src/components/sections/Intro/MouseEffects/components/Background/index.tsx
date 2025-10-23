'use client'

import React from 'react'
import { cn } from '@/utils/react'
import styles from './Background.module.scss'

interface BackgroundProps {
	/** The current title that determines the background color */
	currentTitle: string
	/** Optional className to apply to the background */
	className?: string
}

/**
 * Background component that changes color based on the currentTitle
 * Maps each title to its corresponding background color
 */
function Background({ currentTitle, className }: BackgroundProps) {
	const getBackgroundColor = (title: string): string => {
		switch (title) {
			case 'Software Engineer':
				return styles.software
			case 'Tinkerer':
				return styles.tinkerer
			case 'Learner':
				return styles.learner
			default:
				return styles.default
		}
	}

	return (
		<rect
			className={cn(
				styles.background,
				getBackgroundColor(currentTitle),
				className
			)}
			width='100%'
			height='100%'
			x='0'
			y='0'
		/>
	)
}

export default Background
