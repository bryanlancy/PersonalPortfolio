import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { Point } from '../types'

/**
 * Custom hook for managing click effects including fireworks and debug circles
 * @param svgRef - Reference to the SVG element
 * @returns Object containing click positions, fireworks, and handlers
 */
export const useClickEffects = (svgRef: React.RefObject<SVGSVGElement>) => {
	// State to track click positions for debugging
	const [clickPositions, setClickPositions] = useState<Point[]>([])

	// State to track active fireworks
	const [fireworks, setFireworks] = useState<
		Array<{
			id: string
			x: number
			y: number
		}>
	>([])

	// Maximum number of simultaneous fireworks for performance
	// Reduced from 8 to 5 for better CPU performance
	const MAX_FIREWORKS = 5

	// Throttle clicks to prevent performance issues
	const lastClickTime = useRef(0)
	const CLICK_THROTTLE_MS = 150 // Increased from 100ms to 150ms for better CPU performance

	// Refs for click circle elements to animate
	const clickCircleRefs = useRef<(SVGCircleElement | null)[]>([])

	// Ref to trigger animation from outside useGSAP
	const animateTriggerRef = useRef<() => void>(() => {})

	/**
	 * Handles click events within the SVG to capture click positions and create fireworks
	 * @param e - Mouse event containing click coordinates
	 */
	const handleClick = useCallback(
		(e: React.MouseEvent<SVGSVGElement>) => {
			if (!svgRef.current) return

			// Throttle clicks to prevent performance issues
			const now = Date.now()
			if (now - lastClickTime.current < CLICK_THROTTLE_MS) return
			lastClickTime.current = now

			const rect = svgRef.current.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			// Add the new click position to the array
			setClickPositions(prev => [...prev, [x, y]])

			// Create a new firework at the click position (with limit)
			setFireworks(prev => {
				// Remove oldest fireworks if we exceed the limit
				const currentFireworks =
					prev.length >= MAX_FIREWORKS
						? prev.slice(-(MAX_FIREWORKS - 1))
						: prev

				const fireworkId = `firework-${Date.now()}-${Math.random()}`
				return [...currentFireworks, { id: fireworkId, x, y }]
			})
		},
		[svgRef, MAX_FIREWORKS, CLICK_THROTTLE_MS]
	)

	/**
	 * Removes a completed firework from the state
	 * @param fireworkId - ID of the firework to remove
	 */
	const removeFirework = useCallback((fireworkId: string) => {
		setFireworks(prev =>
			prev.filter(firework => firework.id !== fireworkId)
		)
	}, [])

	/**
	 * Animates click points to disappear with stagger effect from center
	 */
	const animateClickPointsDisappear = useCallback(() => {
		animateTriggerRef.current()
	}, [])

	/**
	 * GSAP animation setup using useGSAP hook for React best practices
	 */
	useGSAP(
		() => {
			// Define the animation function that can be called from outside
			animateTriggerRef.current = () => {
				if (clickPositions.length === 0) return

				// Calculate center point of all click positions
				const centerX =
					clickPositions.reduce((sum, point) => sum + point[0], 0) /
					clickPositions.length
				const centerY =
					clickPositions.reduce((sum, point) => sum + point[1], 0) /
					clickPositions.length

				// Create GSAP timeline for staggered animation
				const tl = gsap.timeline({
					onComplete: () => {
						// Clear all click positions after animation completes
						setClickPositions([])
					},
				})

				// Animate each circle to disappear with stagger
				clickPositions.forEach((_, index) => {
					const circle = clickCircleRefs.current[index]
					if (circle) {
						// Calculate distance from center for stagger timing
						const distance = Math.sqrt(
							Math.pow(clickPositions[index][0] - centerX, 2) +
								Math.pow(clickPositions[index][1] - centerY, 2)
						)

						// Stagger based on distance from center (closer to center disappears first)
						const staggerTime = distance / 200 // Adjust divisor for stagger timing

						tl.to(
							circle,
							{
								scale: 0,
								opacity: 0,
								duration: 0.2,
								ease: 'back.in(1.7)',
							},
							staggerTime
						)
					}
				})
			}
		},
		{ scope: svgRef, dependencies: [clickPositions] }
	)

	return {
		clickPositions,
		fireworks,
		clickCircleRefs,
		handleClick,
		removeFirework,
		animateClickPointsDisappear,
	}
}
