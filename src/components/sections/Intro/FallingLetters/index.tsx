'use client'
import { useRef, useState, useEffect, memo } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { cn } from '@/utils/react'
import { colorRotator } from '@/utils/styles'
import { useScrollTriggerPause, usePerformanceMode } from '@/hooks'

import styles from './FallingLetters.module.scss'
import { calculateCharacterRepetitions, toCamelCase } from '@/utils/general'

// Register SplitText plugin
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)

interface FallingLetterComponent {
	id: string
	title: string
}

const hardcodedColors = {
	softwareEngineer: '#FFD70033',
	learner: '#FFE55C33',
	tinkerer: '#F4D03F33',
} as const

type HardcodedColorKey = keyof typeof hardcodedColors

interface FallingLettersProps {
	currentTitle: string
}

/**
 * Individual falling letter component that handles its own animation
 */
const FallingLetterComponent = memo(function FallingLetterComponent({
	title,
	id,
}: {
	title: string
	id: string
}) {
	const containerRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)

	const splitTextRef = useRef<SplitText | null>(null)
	const textTlRef = useRef<gsap.core.Timeline | null>(null)
	const { contextSafe } = useGSAP({ dependencies: [title, id] })
	const { mode: performanceMode } = usePerformanceMode()

	// Register with pause hook for intro section visibility
	const introSectionRef = useRef<HTMLElement | null>(null)
	useEffect(() => {
		introSectionRef.current = document.querySelector('.introSection') as HTMLElement
	}, [])
	const { registerTimeline } = useScrollTriggerPause(
		introSectionRef as React.RefObject<HTMLElement>,
		'200vh'
	)

	// Register timeline when it's created
	useEffect(() => {
		if (textTlRef.current) {
			registerTimeline(textTlRef.current)
		}
	}, [registerTimeline])

	const animateText = contextSafe(() => {
		// Clean up previous SplitText instance if it exists
		if (splitTextRef.current) {
			splitTextRef.current.revert()
			splitTextRef.current = null
		}

		const splitText = SplitText.create(`.introTitle-${id}`, {
			type: 'chars',
			autoSplit: true,
			onSplit: ({ chars }) => {
				// Clone each character multiple times with staggered positions
				// Reduced from 7 to 4 for better CPU performance
				// Further reduce based on performance mode
				const clonesPerChar = performanceMode === 'low' ? 2 : performanceMode === 'medium' ? 3 : 4 // Number of clones per character
				const clonedChars: HTMLElement[] = []
				const textTl = gsap.timeline({
					scrollTrigger: {
						trigger: '.introSection',
						start: 'top top+=100px',
						end: 'bottom top',
						toggleActions: 'play pause resume reset',
					},
				})
				textTlRef.current = textTl
				registerTimeline(textTl)

				chars.forEach(char => {
					// Keep the original character
					clonedChars.push(char as HTMLElement)

					// Create clones
					for (let i = 1; i < clonesPerChar; i++) {
						const clone = char.cloneNode(true) as HTMLElement
						char.parentNode?.insertBefore(clone, char.nextSibling)

						// Set initial position - clones should be positioned exactly on top of parent
						const camelCaseTitle = toCamelCase(
							title
						) as HardcodedColorKey
						gsap.set(clone, {
							position: 'absolute',
							color:
								hardcodedColors[camelCaseTitle] ||
								colorRotator(),
							left: (char as HTMLElement).offsetLeft,
							top: (char as HTMLElement).offsetTop,
							autoAlpha: 0,
						})

						clonedChars.push(clone)
					}
				})

				// Responsive stagger values - smaller on mobile for better visibility
				const width = window.innerWidth
				const stagger = width < 600 ? 0.35 : width < 950 ? 0.35 : 0.5
				const cloneStagger = width < 600 ? 0.5 : width < 950 ? 0.5 : 0.7

				clonedChars.forEach((char, index) => {
					const charGroup = Math.floor(index / clonesPerChar)
					const cloneIndex = index % clonesPerChar

					// Calculate delay based on character group and clone
					const delay =
						charGroup * stagger + cloneIndex * cloneStagger

					textTl.to(
						char,
						{
							autoAlpha: 1,
							duration: 0.5,
							delay: delay,
						},
						delay
					)

					// Responsive duration - longer on mobile to reduce spacing
					const duration = width < 600 ? 12 : width < 950 ? 10 : 9

					textTl.to(
						char,
						{
							y: window.innerHeight + 200,
							scale: 0.5,
							autoAlpha: 0,
							duration: duration,
							delay: delay,
							ease: 'none',
							// Force GPU acceleration for better performance
							force3D: true,
						},
						delay + 0.5
					)
				})
			},
		})

		splitTextRef.current = splitText
		return splitText
	})

	useGSAP(() => {
		animateText()
		// Cleanup function to kill animation on unmount/change
		return () => {
			if (splitTextRef.current) {
				splitTextRef.current.revert()
				splitTextRef.current = null
			}
		}
	}, [title, id])

	// Calculate responsive char width based on screen size
	const getCharWidth = () => {
		if (window.innerWidth < 600) return 30 // Mobile
		if (window.innerWidth < 950) return 45 // Tablet
		return 60 // Desktop
	}

	return (
		<div ref={containerRef} className={styles.fallingLetters}>
			<h1 ref={titleRef} className={cn(styles.title, `introTitle-${id}`)}>
				{calculateCharacterRepetitions(title, getCharWidth(), window.innerWidth)}
			</h1>
		</div>
	)
})

export default function FallingLetters({ currentTitle }: FallingLettersProps) {
	const [fallingComponents, setFallingComponents] = useState<
		FallingLetterComponent[]
	>([])
	const { mode: performanceMode } = usePerformanceMode()
	// Reduce max components based on performance mode
	const maxComponents = performanceMode === 'low' ? 1 : performanceMode === 'medium' ? 2 : 3

	// Update components when currentTitle changes
	useEffect(() => {
		if (currentTitle) {
			const newId = `${Date.now()}-${Math.random()
				.toString(36)
				.substr(2, 9)}`
			const newComponent: FallingLetterComponent = {
				id: newId,
				title: currentTitle,
			}

			setFallingComponents(prev => {
				const updated = [...prev, newComponent]
				// Remove oldest component if we exceed max length
				return updated.length > maxComponents
					? updated.slice(1)
					: updated
			})
		}
	}, [currentTitle])

	return (
		<>
			{fallingComponents.map(({ id, title }) => (
				<FallingLetterComponent key={id} title={title} id={id} />
			))}
		</>
	)
}
