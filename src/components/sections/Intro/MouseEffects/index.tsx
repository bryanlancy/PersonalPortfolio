'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { cn } from '@/utils/react'
import { useLoading } from '@/context/loadingContext'
import { MouseTrailProps } from './types'
import { useMouseTrail } from './hooks/useMouseTrail'
import { generateCurvedPath } from './utils'
import { useClickEffects, useMouseLeave } from './hooks'
import { DebugCircles, FireworksList } from './components'
import CircularImage, { CircularImageRef } from './components/CircularImage'

import styles from './MouseEffects.module.scss'

gsap.registerPlugin(useGSAP)

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
	const { isLoading } = useLoading()
	const [isReady, setIsReady] = useState(false)

	// Get path data from circular image ref
	const getCircularPathData = (): string | undefined => {
		return circularImageRef.current?.getPathData() || undefined
	}

	const { points, svgRef, returnPointsTop, returnPointsBottom, isAtHome } =
		useMouseTrail({
			top: getCircularPathData,
			bottom: getCircularPathData,
		})

	// Use circular path data directly when trail is at home (finished returning home)
	// Otherwise use generated path from trail points
	const pathData = isAtHome
		? getCircularPathData() || ''
		: generateCurvedPath(points)

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

	// Wait for loading to complete before initializing animations
	useEffect(() => {
		if (!isLoading) {
			// Add a small delay to ensure DOM is fully ready
			const timer = setTimeout(() => {
				setIsReady(true)
			}, 200)
			return () => clearTimeout(timer)
		}
	}, [isLoading])

	return (
		<svg
			ref={svgRef}
			className={cn(styles.mousePath, className)}
			onClick={isReady ? handleClick : undefined}
			style={{
				opacity: isReady ? 1 : 0.3,
				pointerEvents: isReady ? 'auto' : 'none',
			}}>
			<defs>
				<path id='trailPath' d={pathData} />
			</defs>

			{debug && isReady && (
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
			{isReady && (
				<>
					<FireworksList
						fireworks={fireworks}
						onRemoveFirework={removeFirework}
					/>

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
							fill='#111111'
							stroke='#080808'
							strokeWidth={2}
							className={styles.clickPoint}
						/>
					))}
				</>
			)}

			{text && isReady && (
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
