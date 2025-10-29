import React from 'react'

import { Point } from '../../types'

import styles from './DebugCircles.module.scss'

/**
 * Props interface for DebugCircles component
 */
export interface DebugCirclesProps {
	/** Array of return points for top path */
	returnPointsTop: Point[]
	/** Array of return points for bottom path */
	returnPointsBottom: Point[]
	/** Optional className to apply to the debug circles container */
	className?: string
}

/**
 * DebugCircles component that renders debug circles for return points and click positions
 */
function DebugCircles({
	returnPointsTop,
	returnPointsBottom,
	className,
}: DebugCirclesProps) {
	return (
		<g className={className}>
			{/* Debug circles for return points top */}
			{returnPointsTop.map((point, i) => (
				<circle
					key={`top-${i}`}
					cx={point[0]}
					cy={point[1]}
					r={5}
					fill='red'
					className={styles.returnPoint}
				/>
			))}

			{/* Debug circles for return points bottom */}
			{returnPointsBottom.map((point, i) => (
				<circle
					key={`bottom-${i}`}
					cx={point[0]}
					cy={point[1]}
					r={5}
					fill='blue'
					className={styles.returnPoint}
				/>
			))}
		</g>
	)
}

export default DebugCircles
