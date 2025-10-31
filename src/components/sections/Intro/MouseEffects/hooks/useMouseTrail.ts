import { useRef, useState, useEffect } from 'react'

import { Point } from '../types'
import {
	MAX_LENGTH,
	POINT_INTERVAL,
	RETURN_SPEED,
	MIN_FRAME_INTERVAL,
	MAX_FRAME_INTERVAL,
	DEFAULT_HOME_POSITION,
	DEFAULT_RETURN_POINTS,
} from '../constants'

/**
 * Custom hook for managing mouse trail animation logic
 * @param options - Optional object with custom return paths
 * @param options.top - Optional SVG path string or function returning path string for top return path
 * @param options.bottom - Optional SVG path string or function returning path string for bottom return path
 * @returns Object containing trail points and control functions
 */
export const useMouseTrail = (options?: {
	top?: string | (() => string | undefined)
	bottom?: string | (() => string | undefined)
}) => {
	const [points, setPoints] = useState<Point[]>(DEFAULT_RETURN_POINTS)
	const [isAtHome, setIsAtHome] = useState(false)
	const svgRef = useRef<SVGSVGElement | null>(null)
	const lastPos = useRef<Point | null>(null)
	const pendingPoint = useRef<Point | null>(null)
	const frameRef = useRef<number | null>(null)
	const returnRef = useRef<number | null>(null)
	const isInside = useRef(false)
	const currentReturnPointIndex = useRef(0)
	const lastReturnFrameTime = useRef<number | null>(null)
	const isReturning = useRef(false)
	const originalTrailPoints = useRef<Point[]>([])
	const lastMouseMoveTime = useRef<number>(0)
	const pathPointsCache = useRef<Map<string, Point[]>>(new Map())

	/**
	 * Converts SVG path data to an array of points with caching for performance
	 * @param pathData - SVG path string
	 * @returns Array of points along the path, or empty array if path is invalid
	 */
	const pathDataToPoints = (pathData: string | undefined): Point[] => {
		// Handle invalid or empty path data
		if (!pathData || pathData.trim() === '') {
			return []
		}

		// Check cache first
		if (pathPointsCache.current.has(pathData)) {
			return pathPointsCache.current.get(pathData)!
		}

		try {
			// Create a temporary SVG path element to get points
			const path = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'path'
			)
			path.setAttribute('d', pathData)

			// Get path length - if this fails, the path is invalid
			const pathLength = path.getTotalLength()
			if (pathLength === 0) {
				return []
			}

			// Reduce point density for better performance (sample every ~25 units instead of 20)
			const numPoints = Math.max(8, Math.floor(pathLength / 25))
			const points: Point[] = []

			for (let i = 0; i <= numPoints; i++) {
				const point = path.getPointAtLength(
					(i / numPoints) * pathLength
				)
				points.push([point.x, point.y])
			}

			// Cache the result (limit cache size to prevent memory leaks)
			if (pathPointsCache.current.size > 10) {
				const firstKey = pathPointsCache.current.keys().next().value
				pathPointsCache.current.delete(firstKey)
			}
			pathPointsCache.current.set(pathData, points)

			return points
		} catch (error) {
			// If path parsing fails, return empty array
			console.warn('Invalid SVG path data:', pathData, error)
			return []
		}
	}

	// Calculate default return paths as SVG strings
	const defaultTopPath = `M ${DEFAULT_HOME_POSITION[0] - MAX_LENGTH},${
		DEFAULT_HOME_POSITION[1] - 100
	} A 100,100 0 0,1 ${DEFAULT_HOME_POSITION[0] - MAX_LENGTH + 50},${
		DEFAULT_HOME_POSITION[1] - 50
	} L ${DEFAULT_HOME_POSITION[0]},${DEFAULT_HOME_POSITION[1]}`
	const defaultBottomPath = `M ${DEFAULT_HOME_POSITION[0] - MAX_LENGTH},${
		DEFAULT_HOME_POSITION[1] + 100
	} A 100,100 0 0,1 ${DEFAULT_HOME_POSITION[0] - MAX_LENGTH + 50},${
		DEFAULT_HOME_POSITION[1] + 50
	} L ${DEFAULT_HOME_POSITION[0]},${DEFAULT_HOME_POSITION[1]}`

	/**
	 * Gets the current path data, evaluating functions if needed
	 */
	const getCurrentPathData = (
		pathOrFunction: string | (() => string | undefined) | undefined,
		defaultPath: string
	): string => {
		if (!pathOrFunction) return defaultPath
		const result =
			typeof pathOrFunction === 'function'
				? pathOrFunction()
				: pathOrFunction
		return result || defaultPath
	}

	// Cache path data to avoid recalculation on every frame
	const cachedTopPath = useRef<string | null>(null)
	const cachedBottomPath = useRef<string | null>(null)
	const lastPathUpdateTime = useRef<number>(0)
	const PATH_CACHE_DURATION = 100 // Cache path data for 100ms

	// Get current path data (will be re-evaluated when needed, with caching)
	const getCurrentTopPath = () => {
		const now = performance.now()
		if (
			cachedTopPath.current &&
			now - lastPathUpdateTime.current < PATH_CACHE_DURATION
		) {
			return cachedTopPath.current
		}
		const path = getCurrentPathData(options?.top, defaultTopPath)
		cachedTopPath.current = path
		lastPathUpdateTime.current = now
		return path
	}

	const getCurrentBottomPath = () => {
		const now = performance.now()
		if (
			cachedBottomPath.current &&
			now - lastPathUpdateTime.current < PATH_CACHE_DURATION
		) {
			return cachedBottomPath.current
		}
		const path = getCurrentPathData(options?.bottom, defaultBottomPath)
		cachedBottomPath.current = path
		lastPathUpdateTime.current = now
		return path
	}

	/**
	 * Updates the trail with new points, maintaining the maximum length constraint
	 * Optimized for better CPU performance with reduced array operations
	 */
	const updateTrail = () => {
		frameRef.current = null
		const newPoint = pendingPoint.current
		if (!newPoint) return

		const [x, y] = newPoint

		// Skip if movement is too small (using squared distance for performance)
		if (lastPos.current) {
			const [lx, ly] = lastPos.current
			const dx = x - lx
			const dy = y - ly
			const distSquared = dx * dx + dy * dy
			// Compare squared distance to avoid sqrt calculation
			if (distSquared < POINT_INTERVAL * POINT_INTERVAL) return
		}

		lastPos.current = newPoint

		setPoints(prev => {
			// Optimize: start with new point and work backwards
			const newPoints = [...prev, newPoint]
			const newPointsLength = newPoints.length

			// Early return if we don't have enough points to trim
			if (newPointsLength <= 2) return newPoints

			let total = 0
			let trimIndex = newPointsLength - 1

			// Trim points to maintain total length ≤ MAX_LENGTH
			// Optimize: only calculate if we have many points
			if (newPointsLength > 10) {
				for (let i = newPointsLength - 1; i > 0; i--) {
					const [x1, y1] = newPoints[i]
					const [x2, y2] = newPoints[i - 1]
					const dx = x1 - x2
					const dy = y1 - y2
					// Use squared distance first, only sqrt if needed
					const segLengthSquared = dx * dx + dy * dy
					const segLength = Math.sqrt(segLengthSquared)
					total += segLength
					if (total > MAX_LENGTH) {
						trimIndex = i
						break
					}
				}

				if (trimIndex < newPointsLength - 1) {
					return newPoints.slice(trimIndex)
				}
			}

			return newPoints
		})
	}

	/**
	 * Starts the animation to return the trail to the home position(s) with smooth curves
	 */
	const startReturnToHome = () => {
		// Store the current trail points before starting return animation
		setPoints(currentPoints => {
			originalTrailPoints.current = [...currentPoints]
			return currentPoints
		})

		// Reset the return point index when starting
		currentReturnPointIndex.current = 0
		lastReturnFrameTime.current = null
		isReturning.current = true

		const moveToHome = () => {
			// Check if we're still supposed to be returning
			if (!isReturning.current) {
				return
			}
			const currentTime = performance.now()
			const timeSinceLastFrame = lastReturnFrameTime.current
				? currentTime - lastReturnFrameTime.current
				: 16

			// Skip frame if not enough time has passed (for slow speeds)
			if (timeSinceLastFrame < MIN_FRAME_INTERVAL) {
				returnRef.current = requestAnimationFrame(moveToHome)
				return
			}

			// Cap the time interval to prevent visual stuttering
			const cappedTimeSinceLastFrame = Math.min(
				timeSinceLastFrame,
				MAX_FRAME_INTERVAL
			)

			lastReturnFrameTime.current = currentTime
			setPoints(prev => {
				// Double-check we're still returning (prevent race conditions)
				if (!isReturning.current) {
					return prev
				}
				// Determine which return points to use based on final mouse position
				let pointsToFollow: Point[]

				if (prev.length > 0) {
					// Get the final mouse position from the last point in the trail
					const finalPosition = prev[prev.length - 1]
					const [, finalY] = finalPosition

					// Get current path data dynamically
					let currentPathData: string
					if (finalY > DEFAULT_HOME_POSITION[1]) {
						currentPathData = getCurrentBottomPath()
					} else {
						currentPathData = getCurrentTopPath()
					}

					// Convert current path to points
					const currentPoints = pathDataToPoints(currentPathData)
					pointsToFollow =
						currentPoints && currentPoints.length > 0
							? currentPoints
							: [DEFAULT_HOME_POSITION]
				} else {
					// No trail points, default to top points
					const currentPathData = getCurrentTopPath()
					const currentPoints = pathDataToPoints(currentPathData)
					pointsToFollow =
						currentPoints && currentPoints.length > 0
							? currentPoints
							: [DEFAULT_HOME_POSITION]
				}

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
					// Combine original trail points with return path points up to current position
					const returnPathPoints = pointsToFollow.slice(
						0,
						currentReturnPointIndex.current + 1
					)
					const combinedPoints = [
						...originalTrailPoints.current,
						...returnPathPoints,
					]

					// Move to next return point if available
					if (
						currentReturnPointIndex.current <
						pointsToFollow.length - 1
					) {
						currentReturnPointIndex.current++
						returnRef.current = requestAnimationFrame(moveToHome)
						return combinedPoints
					} else {
						// Reached final point, stop moving and clear the trail
						isReturning.current = false
						if (returnRef.current) {
							cancelAnimationFrame(returnRef.current)
							returnRef.current = null
						}

						// Clear the stored original trail points to prevent unwanted tail
						originalTrailPoints.current = []

						// Set isAtHome to true to indicate we're at home position
						setIsAtHome(true)

						// When trail finishes returning home, clear it completely
						// The path will be handled by the circular path data directly
						return []
					}
				}

				// Move towards current target with time-based animation
				const stepSize = RETURN_SPEED * cappedTimeSinceLastFrame
				const stepRatio = Math.min(1, stepSize / dist)
				const newX = x + dx * stepRatio
				const newY = y + dy * stepRatio

				// During return animation, combine original trail with return path points
				// to maintain smooth animation while preventing unwanted tail
				const returnPathPoints = pointsToFollow.slice(
					0,
					currentReturnPointIndex.current
				)
				const newPoints = [
					...originalTrailPoints.current,
					...returnPathPoints,
					[newX, newY] as Point,
				]

				returnRef.current = requestAnimationFrame(moveToHome)
				return newPoints
			})
		}

		if (!returnRef.current) {
			returnRef.current = requestAnimationFrame(moveToHome)
		}
	}

	/**
	 * Handles mouse movement within the SVG element
	 * @param e - Mouse event containing cursor position
	 */
	const MOUSE_MOVE_THROTTLE = 32 // ~30fps for mouse updates (double the animation frame)

	const handleMouseMove = (e: MouseEvent) => {
		if (!isInside.current || !svgRef.current) return

		const now = performance.now()
		// Throttle mouse move updates
		if (now - lastMouseMoveTime.current < MOUSE_MOVE_THROTTLE) {
			// Still update pending point for smoother trail, but don't schedule animation frame
			const rect = svgRef.current.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			pendingPoint.current = [x, y]
			return
		}
		lastMouseMoveTime.current = now

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
		// Reset return state
		isReturning.current = false
		lastReturnFrameTime.current = null
		// Clear stored original trail points
		originalTrailPoints.current = []
		// Set isAtHome to false since mouse is now inside
		setIsAtHome(false)

		// Capture the initial mouse position for smooth transition
		if (svgRef.current) {
			const rect = svgRef.current.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			// Update lastPos to current mouse position for immediate tracking
			lastPos.current = [x, y]

			// If we have existing points, create a smooth transition from current trail position
			setPoints(prev => {
				if (prev.length === 0) {
					// No existing trail, start at mouse position
					return [[x, y]]
				} else {
					// Create smooth transition from current trail position to mouse position
					const lastPoint = prev[prev.length - 1]
					const [lx, ly] = lastPoint
					const dx = x - lx
					const dy = y - ly
					const dist = Math.hypot(dx, dy)

					// If distance is small, just update last position
					if (dist < POINT_INTERVAL) {
						return [...prev.slice(0, -1), [x, y]]
					}

					// Create intermediate points for smooth transition
					const steps = Math.ceil(dist / POINT_INTERVAL)
					const stepX = dx / steps
					const stepY = dy / steps

					const newPoints: Point[] = []
					for (let i = 1; i <= steps; i++) {
						const newX = lx + stepX * i
						const newY = ly + stepY * i
						newPoints.push([newX, newY] as Point)
					}

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

	useEffect(() => {
		const svg = svgRef.current
		if (!svg) return

		// Use passive listeners where possible for better performance
		svg.addEventListener('mousemove', handleMouseMove, { passive: true })
		svg.addEventListener('mouseenter', handleMouseEnter as EventListener, {
			passive: true,
		})
		svg.addEventListener('mouseleave', handleMouseLeave, { passive: true })

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

	return {
		points,
		svgRef,
		returnPointsTop: pathDataToPoints(getCurrentTopPath()),
		returnPointsBottom: pathDataToPoints(getCurrentBottomPath()),
		topPath: getCurrentTopPath(),
		bottomPath: getCurrentBottomPath(),
		isAtHome,
	}
}
