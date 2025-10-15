import React, { useEffect, useRef, useState } from 'react'
import styles from './MouseTrail.module.scss'

type Point = [number, number]

const MAX_LENGTH = 200 // max total path length in px
const POINT_INTERVAL = 10 // minimum distance between points
const RETURN_SPEED = 5 // pixels per frame when moving to target
const HOME_POSITION: Point = [300, 200] // where the line returns when mouse leaves

export default function MouseTrail() {
	const [points, setPoints] = useState<Point[]>([])
	const svgRef = useRef<SVGSVGElement | null>(null)
	const lastPos = useRef<Point | null>(null)
	const pendingPoint = useRef<Point | null>(null)
	const frameRef = useRef<number | null>(null)
	const returnRef = useRef<number | null>(null)
	const isInside = useRef(false)

	useEffect(() => {
		const svg = svgRef.current
		if (!svg) return

		const handleMouseMove = (e: MouseEvent) => {
			if (!isInside.current) return

			const rect = svg.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			pendingPoint.current = [x, y]
			if (!frameRef.current) {
				frameRef.current = requestAnimationFrame(updateTrail)
			}
		}

		const handleMouseEnter = () => {
			isInside.current = true
			// Stop returning when mouse re-enters
			if (returnRef.current) {
				cancelAnimationFrame(returnRef.current)
				returnRef.current = null
			}
		}

		const handleMouseLeave = () => {
			isInside.current = false
			lastPos.current = null
			startReturnToHome()
		}

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

			setPoints((prev: Point[]): Point[] => {
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

		const startReturnToHome = () => {
			const moveToHome = () => {
				setPoints((prev: Point[]): Point[] => {
					if (prev.length === 0) return [[...HOME_POSITION]]

					const last = prev[prev.length - 1]
					const [x, y] = last
					const [hx, hy] = HOME_POSITION
					const dx = hx - x
					const dy = hy - y
					const dist = Math.hypot(dx, dy)

					if (dist < 1) {
						cancelAnimationFrame(returnRef.current!)
						returnRef.current = null
						return [...prev, HOME_POSITION]
					}

					const ratio = Math.min(RETURN_SPEED / dist, 1)
					const newX = x + dx * ratio
					const newY = y + dy * ratio
					const newPoints: Point[] = [...prev, [newX, newY]]

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

					return trimmed
				})

				returnRef.current = requestAnimationFrame(moveToHome)
			}

			if (!returnRef.current) {
				returnRef.current = requestAnimationFrame(moveToHome)
			}
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
