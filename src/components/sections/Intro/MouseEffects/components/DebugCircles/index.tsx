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
	/** Array of click positions to render as debug circles */
	clickPositions: Point[]
	/** Array of refs for click circle elements */
	clickCircleRefs: React.MutableRefObject<(SVGCircleElement | null)[]>
	/** Optional className to apply to the debug circles container */
	className?: string
}

/**
 * DebugCircles component that renders debug circles for return points and click positions
 */
function DebugCircles({
	returnPointsTop,
	returnPointsBottom,
	clickPositions,
	clickCircleRefs,
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

			{/* Debug circles for click positions */}
			{clickPositions.map((point, i) => (
				<circle
					key={`click-${i}`}
					ref={el => {
						clickCircleRefs.current[i] = el
					}}
					cx={point[0]}
					cy={point[1]}
					r={8}
					fill='green'
					stroke='white'
					strokeWidth={2}
					className={styles.clickPoint}
				/>
			))}
		</g>
	)
}

export default DebugCircles
