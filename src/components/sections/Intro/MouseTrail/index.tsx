import React, { useEffect, useRef, useState } from 'react'

import styles from './MouseTrail.module.scss'

/**
 * Configuration constants for the mouse trail animation
 */
const MAX_LENGTH = 300 // max total path length in px
const POINT_INTERVAL = 10 // minimum distance between points

/**
 * Default home position for the trail to return to when mouse leaves
 */
const DEFAULT_HOME_POSITION: [number, number] = [500, 800]

/**
 * Props interface for MouseTrail component
 */
interface MouseTrailProps {
	/** Optional className to apply to the SVG element */
	className?: string

	/** Optional array of points to follow when returning home. If not provided, uses default home position */
	returnPoints?: [number, number][]
	/** Optional text to display along the path */
	text?: string
}

/**
 * MouseTrail component that creates an animated trail following the mouse cursor
 * within an SVG element. The trail automatically returns to specified home position(s)
 * when the mouse leaves the SVG area. Can follow multiple return points sequentially.
 */
function MouseTrail({
	className,
	returnPoints = [
		[DEFAULT_HOME_POSITION[0] - MAX_LENGTH, DEFAULT_HOME_POSITION[1]],
		[...DEFAULT_HOME_POSITION],
	],
	text = "Hello, I'm Bryan",
}: MouseTrailProps) {
	const [points, setPoints] = useState<[number, number][]>(returnPoints)
	const svgRef = useRef<SVGSVGElement | null>(null)
	const lastPos = useRef<[number, number] | null>(null)
	const pendingPoint = useRef<[number, number] | null>(null)
	const frameRef = useRef<number | null>(null)
	const returnRef = useRef<number | null>(null)
	const isInside = useRef(false)
	const currentReturnPointIndex = useRef(0)

	/**
	 * Handles mouse movement within the SVG element
	 * @param e - Mouse event containing cursor position
	 */
	const handleMouseMove = (e: MouseEvent) => {
		if (!isInside.current || !svgRef.current) return

		const rect = svgRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		pendingPoint.current = [x, y]
		if (!frameRef.current) {
			frameRef.current = requestAnimationFrame(updateTrail)
		}
	}

	/**
	 * Handles mouse entering the SVG element
	 */
	const handleMouseEnter = (e: MouseEvent) => {
		isInside.current = true
		// Stop returning when mouse re-enters
		if (returnRef.current) {
			cancelAnimationFrame(returnRef.current)
			returnRef.current = null
		}

		// Capture the initial mouse position for smooth transition
		if (svgRef.current) {
			const rect = svgRef.current.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			// If we have existing points, create a smooth transition
			setPoints(prev => {
				if (prev.length === 0) {
					// No existing trail, start at mouse position
					lastPos.current = [x, y]
					return [[x, y]]
				} else {
					// Create smooth transition from last point to mouse position
					const lastPoint = prev[prev.length - 1]
					const [lx, ly] = lastPoint
					const dx = x - lx
					const dy = y - ly
					const dist = Math.hypot(dx, dy)

					// If distance is small, just update last position
					if (dist < POINT_INTERVAL) {
						lastPos.current = [x, y]
						return [...prev.slice(0, -1), [x, y]]
					}

					// Create intermediate points for smooth transition
					const steps = Math.ceil(dist / POINT_INTERVAL)
					const stepX = dx / steps
					const stepY = dy / steps

					const newPoints: [number, number][] = []
					for (let i = 1; i <= steps; i++) {
						const newX = lx + stepX * i
						const newY = ly + stepY * i
						newPoints.push([newX, newY] as [number, number])
					}

					lastPos.current = [x, y]
					return [...prev.slice(0, -1), ...newPoints]
				}
			})
		}
	}

	/**
	 * Handles mouse leaving the SVG element
	 */
	const handleMouseLeave = () => {
		isInside.current = false
		lastPos.current = null
		startReturnToHome()
	}

	/**
	 * Updates the trail with new points, maintaining the maximum length constraint
	 */
	const updateTrail = () => {
		frameRef.current = null
		const newPoint = pendingPoint.current
		if (!newPoint) return

		const [x, y] = newPoint

		// Skip if movement is too small
		if (lastPos.current) {
			const [lx, ly] = lastPos.current
			const dx = x - lx
			const dy = y - ly
			const dist = Math.sqrt(dx * dx + dy * dy)
			if (dist < POINT_INTERVAL) return
		}

		lastPos.current = newPoint

		setPoints(prev => {
			const newPoints = [...prev, newPoint]
			let total = 0
			let trimmed = [...newPoints]

			// Trim points to maintain total length ≤ MAX_LENGTH
			for (let i = trimmed.length - 1; i > 0; i--) {
				const [x1, y1] = trimmed[i]
				const [x2, y2] = trimmed[i - 1]
				const segLength = Math.hypot(x1 - x2, y1 - y2)
				total += segLength
				if (total > MAX_LENGTH) {
					trimmed = trimmed.slice(i)
					break
				}
			}

			return trimmed
		})
	}

	/**
	 * Starts the animation to return the trail to the home position(s) with smooth curves
	 */
	const startReturnToHome = () => {
		// Reset the return point index when starting
		currentReturnPointIndex.current = 0

		const moveToHome = () => {
			setPoints(prev => {
				// Get the return points to follow
				const pointsToFollow =
					returnPoints && returnPoints.length > 0
						? returnPoints
						: [DEFAULT_HOME_POSITION]

				// If no current trail, start at the first return point
				if (prev.length === 0) {
					return [pointsToFollow[0]]
				}

				const last = prev[prev.length - 1]
				const [x, y] = last
				const currentTarget =
					pointsToFollow[currentReturnPointIndex.current]
				const [tx, ty] = currentTarget
				const dx = tx - x
				const dy = ty - y
				const dist = Math.hypot(dx, dy)

				if (dist < 1) {
					// Reached current target point
					const newPoints = [...prev, currentTarget]

					// Move to next return point if available
					if (
						currentReturnPointIndex.current <
						pointsToFollow.length - 1
					) {
						currentReturnPointIndex.current++
						returnRef.current = requestAnimationFrame(moveToHome)
						return newPoints
					} else {
						// Reached final point, stop moving
						if (returnRef.current) {
							cancelAnimationFrame(returnRef.current)
							returnRef.current = null
						}
						return newPoints
					}
				}

				// Move towards current target with smooth interpolation
				const speed = 0.1 // Smooth interpolation factor (0.1 = 10% of distance per frame)
				const newX = x + dx * speed
				const newY = y + dy * speed
				const newPoints = [...prev, [newX, newY] as [number, number]]

				// Trim to keep total path length within MAX_LENGTH
				let total = 0
				let trimmed = [...newPoints]
				for (let i = trimmed.length - 1; i > 0; i--) {
					const [x1, y1] = trimmed[i]
					const [x2, y2] = trimmed[i - 1]
					const segLength = Math.hypot(x1 - x2, y1 - y2)
					total += segLength
					if (total > MAX_LENGTH) {
						trimmed = trimmed.slice(i)
						break
					}
				}

				returnRef.current = requestAnimationFrame(moveToHome)
				return trimmed
			})
		}

		if (!returnRef.current) {
			returnRef.current = requestAnimationFrame(moveToHome)
		}
	}

	useEffect(() => {
		const svg = svgRef.current
		if (!svg) return

		svg.addEventListener('mousemove', handleMouseMove)
		svg.addEventListener('mouseenter', handleMouseEnter as EventListener)
		svg.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			svg.removeEventListener('mousemove', handleMouseMove)
			svg.removeEventListener(
				'mouseenter',
				handleMouseEnter as EventListener
			)
			svg.removeEventListener('mouseleave', handleMouseLeave)
			if (frameRef.current) cancelAnimationFrame(frameRef.current)
			if (returnRef.current) cancelAnimationFrame(returnRef.current)
		}
	}, [])

	/**
	 * Generates a smooth curved path using cubic Bézier curves with tension control
	 * @param points - Array of [x, y] coordinate pairs
	 * @returns SVG path data string with smooth curves
	 */
	const generateCurvedPath = (points: [number, number][]): string => {
		if (points.length === 0) return ''
		if (points.length === 1) return `M${points[0][0]},${points[0][1]}`
		if (points.length === 2) {
			// For two points, create a smooth curve
			const [x1, y1] = points[0]
			const [x2, y2] = points[1]
			const dx = x2 - x1
			const dy = y2 - y1
			const controlX1 = x1 + dx * 0.3
			const controlY1 = y1 + dy * 0.3
			const controlX2 = x2 - dx * 0.3
			const controlY2 = y2 - dy * 0.3
			return `M${x1},${y1} C${controlX1},${controlY1} ${controlX2},${controlY2} ${x2},${y2}`
		}

		let path = `M${points[0][0]},${points[0][1]}`

		// Calculate control points for smooth cubic Bézier curves
		for (let i = 1; i < points.length; i++) {
			const [x, y] = points[i]
			const [prevX, prevY] = points[i - 1]

			// Calculate tension factor (how tight the curves are)
			const tension = 0.3

			if (i === 1) {
				// First curve: use next point to determine control points
				const [nextX, nextY] = points[i + 1] || points[i]
				const dx1 = (nextX - prevX) * tension
				const dy1 = (nextY - prevY) * tension
				const dx2 = (x - prevX) * tension
				const dy2 = (y - prevY) * tension

				const controlX1 = prevX + dx1
				const controlY1 = prevY + dy1
				const controlX2 = x - dx2
				const controlY2 = y - dy2

				path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`
			} else if (i === points.length - 1) {
				// Last curve: use previous point to determine control points
				const [prevPrevX, prevPrevY] = points[i - 2]
				const dx1 = (prevX - prevPrevX) * tension
				const dy1 = (prevY - prevPrevY) * tension
				const dx2 = (x - prevX) * tension
				const dy2 = (y - prevY) * tension

				const controlX1 = prevX + dx1
				const controlY1 = prevY + dy1
				const controlX2 = x - dx2
				const controlY2 = y - dy2

				path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`
			} else {
				// Middle curves: use both previous and next points for smoothness
				const [prevPrevX, prevPrevY] = points[i - 2]
				const [nextX, nextY] = points[i + 1]

				// Calculate direction vectors
				const dx1 = (prevX - prevPrevX) * tension
				const dy1 = (prevY - prevPrevY) * tension
				const dx2 = (nextX - prevX) * tension
				const dy2 = (nextY - prevY) * tension

				const controlX1 = prevX + dx1
				const controlY1 = prevY + dy1
				const controlX2 = x - dx2
				const controlY2 = y - dy2

				path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`
			}
		}

		return path
	}

	const pathData = generateCurvedPath(points)

	return (
		<svg ref={svgRef} className={`${styles.mousePath} ${className || ''}`}>
			<defs>
				<path id='trailPath' d={pathData} fill='none' />
			</defs>
			<path d={pathData} className={styles.path} />
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
