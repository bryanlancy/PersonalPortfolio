import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/**
 * Props interface for Firework component
 */
export interface FireworkProps {
	/** X coordinate where the firework should explode */
	x: number
	/** Y coordinate where the firework should explode */
	y: number
	/** Callback function called when the firework animation completes */
	onComplete?: () => void
	/** Optional className to apply to the firework container */
	className?: string
}

/**
 * Firework component that creates an animated explosion effect using GSAP
 * Renders SVG circles with fiery colors that animate outward from the center point
 */
function Firework({ onComplete, className }: FireworkProps) {
	const containerRef = useRef<SVGGElement>(null)
	const particlesRef = useRef<(SVGCircleElement | null)[]>([])

	/**
	 * Generate random particles for the firework effect (memoized)
	 */
	const generateParticles = () => {
		const particles = []
		const particleCount = 12 + Math.floor(Math.random() * 8) // 12-19 particles

		for (let i = 0; i < particleCount; i++) {
			const angle =
				(i / particleCount) * Math.PI * 2 + Math.random() * 0.5
			const distance = 30 + Math.random() * 40 // 30-70 pixel radius
			const particleX = Math.cos(angle) * distance
			const particleY = Math.sin(angle) * distance

			// Fiery color palette for authentic firework look
			const colors = [
				'#FF4500', // OrangeRed
				'#FF6347', // Tomato
				'#FFD700', // Gold
				'#FF8C00', // DarkOrange
				'#FFA500', // Orange
				'#FF7F50', // Coral
				'#FFB347', // Peach
				'#FFCCCB', // LightPink
				'#FF69B4', // HotPink
				'#DC143C', // Crimson
			]
			const color = colors[Math.floor(Math.random() * colors.length)]

			particles.push({
				id: i,
				x: particleX,
				y: particleY,
				isCircle: true, // Always use circles for firework effect
				color,
				size: 2 + Math.random() * 5, // 2-7 pixel size
			})
		}

		return particles
	}

	// Generate particles once when component mounts
	const [particles] = useState(() => generateParticles())

	/**
	 * GSAP animation setup using useGSAP hook for React best practices
	 * No dependencies to ensure animation runs only once per component mount
	 */
	useGSAP(
		() => {
			if (!containerRef.current) return

			// Create timeline for the firework animation
			const tl = gsap.timeline({
				onComplete: () => {
					// Call the completion callback
					onComplete?.()
				},
			})

			// Animate each particle
			particles.forEach((particle, index) => {
				const element = particlesRef.current[index]
				if (!element) return

				// Initial state - particles start at center (0, 0)
				gsap.set(element, {
					x: 0,
					y: 0,
					opacity: 0,
					scale: 0,
				})

				// Animation sequence
				const delay = index * 0.02 // Stagger the particles slightly

				tl.to(
					element,
					{
						x: particle.x,
						y: particle.y,
						opacity: 1,
						scale: 1,
						duration: 0.3,
						ease: 'back.out(1.7)',
					},
					delay
				)
					.to(
						element,
						{
							duration: 2,
							y: '+=72px',
						},
						0.4 + delay
					)
					.to(
						element,
						{
							opacity: 0,
							scale: 0.3,
							duration: 0.6,
							ease: 'power2.out',
						},
						'<'
					)
			})
		},
		{ scope: containerRef }
	)

	return (
		<g ref={containerRef} className={className}>
			{particles.map((particle, index) => (
				<circle
					key={`particle-${index}`}
					ref={(el: SVGCircleElement | null) => {
						particlesRef.current[index] = el
					}}
					cx={0}
					cy={0}
					r={particle.size}
					fill={particle.color}
					stroke='rgba(255, 255, 255, 0.3)'
					strokeWidth={0.5}
				/>
			))}
		</g>
	)
}

export default Firework
