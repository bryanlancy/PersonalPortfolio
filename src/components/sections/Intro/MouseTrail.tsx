import React, { useEffect, useRef, useState } from 'react'
import styles from './MouseTrail.module.scss'

type Point = [number, number]

const MAX_LENGTH = 200
const POINT_INTERVAL = 10
const RETURN_SPEED = 5

const HOME_POSITION: Point = [300, 200] // target Y
const HORIZONTAL_OFFSET_X = 120 // target X

export default function MouseTrail() {
	const [points, setPoints] = useState<Point[]>([])
	const svgRef = useRef<SVGSVGElement | null>(null)
	const lastPos = useRef<Point | null>(null)
	const pendingPoint = useRef<Point | null>(null)
	const frameRef = useRef<number | null>(null)
	const returnRef = useRef<number | null>(null)
	const isInside = useRef(false)
	const returning = useRef(false)

	useEffect(() => {
		const svg = svgRef.current
		if (!svg) return

		const handleMouseMove = (e: MouseEvent) => {
			if (!isInside.current) return
			const rect = svg.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			pendingPoint.current = [x, y]
			if (!frameRef.current)
				frameRef.current = requestAnimationFrame(updateTrail)
		}

		const handleMouseEnter = () => {
			isInside.current = true
			returning.current = false
			if (returnRef.current) {
				cancelAnimationFrame(returnRef.current)
				returnRef.current = null
			}
		}

		const handleMouseLeave = () => {
			isInside.current = false
			lastPos.current = null
			returning.current = true
			startReturnAnimation()
		}

		const updateTrail = () => {
			frameRef.current = null
			const newPoint = pendingPoint.current
			if (!newPoint) return

			const [x, y] = newPoint
			if (lastPos.current) {
				const [lx, ly] = lastPos.current
				if (Math.hypot(x - lx, y - ly) < POINT_INTERVAL) return
			}
			lastPos.current = newPoint

			setPoints((prev: Point[]): Point[] => {
				const newPoints = [...prev, newPoint]
				// trim only while following mouse
				return trimPath(newPoints, true)
			})
		}

		const trimPath = (pts: Point[], allowTrim: boolean) => {
			if (!allowTrim) return [...pts] // do not trim during return
			let total = 0
			let trimmed = [...pts]
			for (let i = trimmed.length - 1; i > 0; i--) {
				const [x1, y1] = trimmed[i]
				const [x2, y2] = trimmed[i - 1]
				total += Math.hypot(x1 - x2, y1 - y2)
				if (total > MAX_LENGTH) {
					trimmed = trimmed.slice(i)
					break
				}
			}
			return trimmed
		}

		const startReturnAnimation = () => {
			const animateReturn = () => {
				setPoints(prevPoints => {
					if (prevPoints.length === 0)
						return [
							[
								HOME_POSITION[0] + HORIZONTAL_OFFSET_X,
								HOME_POSITION[1],
							],
						]

					const newPoints = [...prevPoints]
					const last = newPoints[newPoints.length - 1]
					const targetX = HOME_POSITION[0] + HORIZONTAL_OFFSET_X
					const targetY = HOME_POSITION[1]

					// Move last point toward horizontal target
					const dx = targetX - last[0]
					const dy = targetY - last[1]
					const dist = Math.hypot(dx, dy)

					if (dist < 1) {
						// Done returning
						returning.current = false
						cancelAnimationFrame(returnRef.current!)
						return trimPath(newPoints, false) // keep full trail
					}

					const ratio = dist > RETURN_SPEED ? RETURN_SPEED / dist : 1
					newPoints[newPoints.length - 1] = [
						last[0] + dx * ratio,
						last[1] + dy * ratio,
					]

					// Smoothly align all previous points to target Y
					const alignedPoints = newPoints.map(
						([x, y], i) => [x, y + (targetY - y) * 0.05] as Point
					)

					return trimPath(alignedPoints, false) // don't trim during return
				})

				returnRef.current = requestAnimationFrame(animateReturn)
			}

			if (!returnRef.current)
				returnRef.current = requestAnimationFrame(animateReturn)
		}

		svg.addEventListener('mousemove', handleMouseMove)
		svg.addEventListener('mouseenter', handleMouseEnter)
		svg.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			svg.removeEventListener('mousemove', handleMouseMove)
			svg.removeEventListener('mouseenter', handleMouseEnter)
			svg.removeEventListener('mouseleave', handleMouseLeave)
			if (frameRef.current) cancelAnimationFrame(frameRef.current)
			if (returnRef.current) cancelAnimationFrame(returnRef.current)
		}
	}, [])

	const pathData =
		points.length > 0
			? `M${points.map(([x, y]) => `${x},${y}`).join(' L')}`
			: ''

	return (
		<svg ref={svgRef} className={styles.mousePath}>
			<path
				d={pathData}
				stroke='cyan'
				strokeWidth={3}
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
