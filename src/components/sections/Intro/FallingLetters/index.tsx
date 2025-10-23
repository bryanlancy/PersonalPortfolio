'use client'
import { useRef, useState, useEffect, memo } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

import { cn } from '@/utils/react'

import styles from './FallingLetters.module.scss'
import { calculateTextRepetitions } from '@/utils/general'

// Register SplitText plugin
gsap.registerPlugin(useGSAP, SplitText)

interface FallingLetterComponent {
	id: string
	title: string
}

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

	const { contextSafe } = useGSAP({ dependencies: [title, id] })

	const animateText = contextSafe(() => {
		return SplitText.create(`.introTitle-${id}`, {
			type: 'chars',
			autoSplit: true,
			onSplit: ({ chars }) => {
				// Clone each character multiple times with staggered positions
				const clonesPerChar = 10 // Number of clones per character
				const clonedChars: HTMLElement[] = []
				const textTl = gsap.timeline({
					scrollTrigger: {
						trigger: '.introSection',
						start: 'top top+=100px',
						end: 'bottom top',
						toggleActions: 'play pause resume reset',
					},
				})

				chars.forEach(char => {
					// Keep the original character
					clonedChars.push(char as HTMLElement)

					// Create clones
					for (let i = 1; i < clonesPerChar; i++) {
						const clone = char.cloneNode(true) as HTMLElement
						char.parentNode?.insertBefore(clone, char.nextSibling)

						// Set initial position - clones should be positioned exactly on top of parent
						gsap.set(clone, {
							position: 'absolute',
							left: (char as HTMLElement).offsetLeft,
							top: (char as HTMLElement).offsetTop,
							autoAlpha: 0,
						})

						clonedChars.push(clone)
					}
				})

				// Stagger the animation start times for each character group
				const stagger = 0.3
				const cloneStagger = 0.25 // Stagger between clones of the same character

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

					textTl.to(
						char,
						{
							y: window.innerHeight + 200,
							scale: 0.5,
							duration: 7.5,
							delay: delay,
							ease: 'power2.out',
						},
						delay + 0.5
					)
				})
			},
		})
	})

	useGSAP(() => {
		animateText()
	}, [title, id])

	return (
		<div ref={containerRef} className={styles.fallingLetters}>
			<h1 ref={titleRef} className={cn(styles.title, `introTitle-${id}`)}>
				{calculateTextRepetitions(title, 60, window.innerWidth - 100)}
			</h1>
		</div>
	)
})

export default function FallingLetters({ currentTitle }: FallingLettersProps) {
	const [fallingComponents, setFallingComponents] = useState<
		FallingLetterComponent[]
	>([])
	const maxComponents = 3

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
