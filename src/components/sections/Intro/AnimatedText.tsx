'use client'

import React, { FC } from 'react'
import styles from './AnimatedText.module.scss'
import { cn } from '@/utils/react'

interface AnimatedTextProps {
	/** Text to be displayed and animated */
	text: string
	/** Color of text outline, in hex (#rrggbbaa) */
	color: string
	/** Duration of animation, in milliseconds */
	duration: number
}

const AnimatedText: FC<AnimatedTextProps> = ({ text, color, duration }) => {
	return (
		<svg className={styles.outline} viewBox='0 0 250 75'>
			<symbol id='text'>
				<text textAnchor='start' dominantBaseline='hanging' x='0' y='5'>
					{text}
				</text>
			</symbol>
			<g>
				<use xlinkHref='#text' style={{ stroke: color, animationDuration: `${(duration - 1000) / 1000}s` }} className={cn(styles.line, styles.animation)}></use>
			</g>
		</svg>
	)
}

export default AnimatedText
