import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { cn } from '@/utils/react'

import styles from './WaveBorder.module.scss'

interface WaveBorderProps {
	/** CSS class name */
	className?: string
	/** Height of the wave in pixels */
	height?: number
	/** Amplitude of the wave (how tall the peaks are) */
	amplitude?: number
	/** Speed of the wave animation (0-1) */
	speed?: number
	/** Number of wave points/segments */
	points?: number
	/** Whether the animation is paused */
	paused?: boolean
}

const WaveBorder = ({
	className,
	height = 50,
	amplitude = 15,
	speed = 0.15,
	points = 3,
	paused = false,
}: WaveBorderProps) => {
	const svgRef = useRef<SVGSVGElement>(null)
	const pathRef = useRef<SVGPathElement>(null)
	const offsetObj = useRef({ value: 0 })
	const timelineRef = useRef<gsap.core.Timeline | null>(null)
	// Store random wave parameters so they don't change during animation
	const waveParamsRef = useRef<Array<{
		freq: number
		amp: number
		phase: number
	}> | null>(null)

	// Generate random wave parameters on mount
	if (waveParamsRef.current === null) {
		// Generate 3-5 random harmonic components for a unique wave pattern
		const numHarmonics = 3 + Math.floor(Math.random() * 3) // 3-5 harmonics
		waveParamsRef.current = []

		// Use integer frequency multipliers to ensure perfect periodicity for smooth looping
		const possibleFreqs = [0.5, 1, 1.5, 2, 2.5, 3]

		for (let i = 0; i < numHarmonics; i++) {
			waveParamsRef.current.push({
				// Random frequency from predefined set (ensures periodicity)
				freq: possibleFreqs[
					Math.floor(Math.random() * possibleFreqs.length)
				],
				// Random amplitude, weighted so first harmonic is strongest
				amp: (1 / (i + 1)) * (0.5 + Math.random() * 0.5),
				// Random phase offset
				phase: Math.random() * Math.PI * 2,
			})
		}
	}

	useGSAP(() => {
		if (!svgRef.current || !pathRef.current) return

		const path = pathRef.current
		const waveParams = waveParamsRef.current!

		// Use viewBox width for coordinate system (matches viewBox="0 0 1000 height")
		const viewBoxWidth = 1000

		// Calculate wave height at a given position using random harmonics
		const getWaveHeight = (x: number, width: number, offset: number) => {
			// Normalize x to 0-1 range
			const normalizedX = x / width
			// Base wave frequency based on points
			const baseFreq = points

			let waveHeight = 0
			// Sum all harmonic components
			for (const param of waveParams) {
				waveHeight +=
					param.amp *
					Math.sin(
						normalizedX * Math.PI * 2 * baseFreq * param.freq +
							param.phase +
							offset
					)
			}

			// Normalize the amplitude so it stays within bounds
			const totalAmp = waveParams.reduce((sum, p) => sum + p.amp, 0)
			return (waveHeight / totalAmp) * amplitude
		}

		// Generate wave path data
		const generatePath = (offset: number) => {
			const centerY = height / 2
			const numPoints = points * 4 // More points for smoother curves

			// Start path at left edge, center
			let pathData = `M 0 ${centerY}`

			// Generate wavy line using smooth curves
			// Use viewBoxWidth to ensure path spans full width
			for (let i = 1; i <= numPoints; i++) {
				const x = (i * viewBoxWidth) / numPoints
				// Use random wave function
				const y = centerY + getWaveHeight(x, viewBoxWidth, offset)

				if (i === 1) {
					pathData += ` L ${x} ${y}`
				} else {
					// Use smooth curves (cubic bezier) for better wave appearance
					const prevX = ((i - 1) * viewBoxWidth) / numPoints
					const prevY =
						centerY + getWaveHeight(prevX, viewBoxWidth, offset)
					const segmentWidth = viewBoxWidth / numPoints
					const controlX1 = prevX + segmentWidth / 3
					const controlY1 = prevY
					const controlX2 = x - segmentWidth / 3
					const controlY2 = y
					pathData += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x} ${y}`
				}
			}

			// Close the path to form a filled shape
			pathData += ` L ${viewBoxWidth} ${height} L 0 ${height} Z`

			return pathData
		}

		// Update path
		const updatePath = () => {
			if (!pathRef.current) return
			const pathData = generatePath(offsetObj.current.value)
			path.setAttribute('d', pathData)
		}

		// Initial path
		updatePath()

		// Create animation timeline - always start paused, we'll control it via useEffect
		const timeline = gsap.timeline({
			repeat: -1,
			paused: true, // Always start paused, let useEffect control it
		})

		// Animate the offset to create wave motion
		// Use a full cycle (2π) for smooth looping - sine waves are periodic so this loops seamlessly
		timeline.to(offsetObj.current, {
			value: Math.PI * 2,
			duration: 1 / speed,
			ease: 'none',
			onUpdate: updatePath,
		})

		timelineRef.current = timeline

		// Handle resize
		const handleResize = () => {
			updatePath()
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (timelineRef.current) {
				timelineRef.current.kill()
				timelineRef.current = null
			}
		}
	}, [height, amplitude, speed, points])

	// Handle pause/resume - both initial state and when prop changes
	useEffect(() => {
		if (timelineRef.current) {
			// Use paused() setter for more reliable control
			timelineRef.current.paused(paused)
		}
	}, [paused])

	return (
		<svg
			ref={svgRef}
			className={cn(styles.waveBorder, className)}
			viewBox={`0 0 1000 ${height}`}
			preserveAspectRatio='none'
			style={{ width: '100%', height: `${height}px` }}>
			<path ref={pathRef} className={styles.path} />
		</svg>
	)
}

export default WaveBorder
