import React, { useEffect, useRef } from 'react'

import { cn } from '@/utils/react'

import { MouseTrailProps } from './types'
import { useMouseTrail } from './hooks/useMouseTrail'
import { generateCurvedPath } from './utils'
import { useClickEffects, useMouseLeave } from './hooks'
import { DebugCircles, FireworksList } from './components'
import CircularImage, { CircularImageRef } from './components/CircularImage'

import styles from './MouseEffects.module.scss'

/**
 * MouseTrail component that creates an animated trail following the mouse cursor
 * within an SVG element. The trail automatically returns to specified home position(s)
 * when the mouse leaves the SVG area. Can follow multiple return points sequentially.
 */
function MouseTrail({
	className,
	text = "Hello, I'm Bryan",
	debug = false,
}: MouseTrailProps) {
	const circularImageRef = useRef<CircularImageRef>(null)

	// Get path data from circular image ref
	const getCircularPathData = (): string | undefined => {
		return circularImageRef.current?.getPathData() || undefined
	}

	const { points, svgRef, returnPointsTop, returnPointsBottom } =
		useMouseTrail({
			top: getCircularPathData,
			bottom: getCircularPathData,
		})
	const pathData = generateCurvedPath(points)

	// Use custom hook for click effects management
	const {
		clickPositions,
		fireworks,
		clickCircleRefs,
		handleClick,
		removeFirework,
		animateClickPointsDisappear,
	} = useClickEffects(svgRef)

	// Use custom hook for mouse leave handling
	useMouseLeave(svgRef, animateClickPointsDisappear, [clickPositions])

	// Update circle refs array when click positions change
	useEffect(() => {
		clickCircleRefs.current = clickCircleRefs.current.slice(
			0,
			clickPositions.length
		)
	}, [clickPositions, clickCircleRefs])

	const circleRadius = 100

	return (
		<svg
			ref={svgRef}
			className={cn(styles.mousePath, className)}
			onClick={handleClick}>
			<defs>
				<path id='trailPath' d={pathData} fill='none' />
			</defs>

			{debug && (
				<>
					<DebugCircles
						returnPointsTop={returnPointsTop}
						returnPointsBottom={returnPointsBottom}
						clickPositions={clickPositions}
						clickCircleRefs={clickCircleRefs}
					/>
					<path d={pathData} className={styles.path} />
				</>
			)}
			<CircularImage
				ref={circularImageRef}
				imageUrl={
					'https://gravatar.com/avatar/' + // Gravatar URL
					'e198f1211a23c23d967a61304e7240865b9133734a783cc30e44302c0349827e' + // Bryan's Gravatar hash
					`?s=${circleRadius * 2}` // Size of the image
				}
				radius={circleRadius}
				x={300}
				y={600}
				className={styles.circularImage}
			/>
			<FireworksList
				fireworks={fireworks}
				onRemoveFirework={removeFirework}
			/>

			{text && (
				<text className={styles.pathText}>
					<textPath
						href='#trailPath'
						textAnchor='end'
						startOffset='95%'>
						{text}
					</textPath>
				</text>
			)}
		</svg>
	)
}

export default MouseTrail
