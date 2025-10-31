'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@/utils/react'

import { forwardRef, RefObject, useEffect, useRef, useState } from 'react'
import {
	faBook,
	faLaptopCode,
	faScrewdriverWrench,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'
import styles from './TitleSections.module.scss'
import { generateSpiralPath } from '@/utils/svg'

gsap.registerPlugin(useGSAP)

interface CardProps {
	title: string
	className: string
	children?: React.ReactNode
}
export interface CardPropsWithRef extends CardProps {
	ref: RefObject<HTMLDivElement>
}

interface TitleSectionsProps {
	onTitleChange?: (title: string) => void
}
const Card = forwardRef<HTMLDivElement, CardProps>(
	({ title, className, children }, ref) => {
		return (
			<div className={cn(styles.card, className)} ref={ref}>
				<div className={styles.front}>
					<h2>{title}</h2>
					{children}
				</div>
				<div className={styles.back}></div>
			</div>
		)
	}
)

const TitleCards = ({ onTitleChange }: TitleSectionsProps) => {
	const [isLoaded, setIsLoaded] = useState(false)

	// Generate spirals for different screen sizes
	// Mobile: 200px, Tablet: 350px, Desktop: 800px (matches SCSS breakpoints)
	const generateSpiralConfigs = (endRadius: number) => ({
		mobile: {
			width: 200,
			height: 200,
			endRadius,
		},
		tablet: {
			width: 350,
			height: 350,
			endRadius,
		},
		desktop: {
			width: 800,
			height: 800,
			endRadius,
		},
	})

	// Responsive spiral configurations for each card type
	const spiralConfigs = {
		software: generateSpiralConfigs(2.5),
		tinkerer: generateSpiralConfigs(2.5),
		learner: generateSpiralConfigs(2.5),
	}

	const cards: (CardProps & { ref: RefObject<HTMLDivElement> })[] = [
		{
			title: 'Software Engineer',
			className: styles.software,
			ref: useRef<HTMLDivElement>(null),
			children: (
				<div className={styles.softwareContent}>
					<svg className={styles.backgroundSvg}>
						{/* Mobile spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralMobile
							)}
							d={generateSpiralPath({
								...spiralConfigs.software.mobile,
								type: 'rectangular',
								turns: 8,
								pointsPerTurn: 4,
								startRadius: 0.01,
							})}
						/>
						{/* Tablet spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralTablet
							)}
							d={generateSpiralPath({
								...spiralConfigs.software.tablet,
								type: 'rectangular',
								turns: 8,
								pointsPerTurn: 4,
								startRadius: 0.01,
							})}
						/>
						{/* Desktop spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralDesktop
							)}
							d={generateSpiralPath({
								...spiralConfigs.software.desktop,
								type: 'rectangular',
								turns: 8,
								pointsPerTurn: 4,
								startRadius: 0.01,
							})}
						/>
					</svg>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faLaptopCode}
					/>
				</div>
			),
		},
		{
			title: 'Tinkerer',
			className: styles.tinkerer,
			ref: useRef<HTMLDivElement>(null),
			children: (
				<div className={styles.tinkererContent}>
					<svg className={styles.backgroundSvg}>
						{/* Mobile spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralMobile
							)}
							d={generateSpiralPath({
								...spiralConfigs.tinkerer.mobile,
								type: 'circular',
								turns: 12,
								pointsPerTurn: 50,
								startRadius: 0.05,
							})}
						/>
						{/* Tablet spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralTablet
							)}
							d={generateSpiralPath({
								...spiralConfigs.tinkerer.tablet,
								type: 'circular',
								turns: 12,
								pointsPerTurn: 50,
								startRadius: 0.05,
							})}
						/>
						{/* Desktop spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralDesktop
							)}
							d={generateSpiralPath({
								...spiralConfigs.tinkerer.desktop,
								type: 'circular',
								turns: 12,
								pointsPerTurn: 50,
								startRadius: 0.05,
							})}
						/>
					</svg>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faScrewdriverWrench}
					/>
				</div>
			),
		},
		{
			title: 'Learner',
			className: styles.learner,
			ref: useRef<HTMLDivElement>(null),
			children: (
				<div className={styles.learnerContent}>
					<svg className={styles.backgroundSvg}>
						{/* Mobile spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralMobile
							)}
							d={generateSpiralPath({
								...spiralConfigs.learner.mobile,
								type: 'hexagonal',
								turns: 10,
								pointsPerTurn: 6,
								startRadius: 0.01,
							})}
						/>
						{/* Tablet spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralTablet
							)}
							d={generateSpiralPath({
								...spiralConfigs.learner.tablet,
								type: 'hexagonal',
								turns: 10,
								pointsPerTurn: 6,
								startRadius: 0.01,
							})}
						/>
						{/* Desktop spiral */}
						<path
							className={cn(
								styles.spiralPath,
								styles.spiralDesktop
							)}
							d={generateSpiralPath({
								...spiralConfigs.learner.desktop,
								type: 'hexagonal',
								turns: 10,
								pointsPerTurn: 6,
								startRadius: 0.01,
							})}
						/>
					</svg>
					<FontAwesomeIcon className={styles.icon} icon={faBook} />
				</div>
			),
		},
	]
	const [_, setCurrentTitle] = useState<string>(cards[0].title)

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	useGSAP(() => {
		const spiralTimeline = gsap.timeline({ repeat: -1 })
		spiralTimeline.to(`.${styles.backgroundSvg}`, {
			rotate: '+=360',
			duration: 60,
			ease: 'none',
		})

		// Function to calculate the Z-offset for a 3D card carousel
		// This calculates the minimum distance needed to prevent card overlap
		// Formula: For 3 cards in a circle, minimum Z = cardDiagonal / (2 * sin(60°))
		const calculateCardCarouselRadius = (
			cardWidth: number,
			cardHeight: number,
			numCards: number = 3,
			scaleFactor: number = 1
		) => {
			// Calculate diagonal of the card
			const diagonal = Math.sqrt(cardWidth ** 2 + cardHeight ** 2)

			// Calculate angle between cards (360 / numCards)
			const angleBetweenCards = (Math.PI * 2) / numCards

			// Calculate minimum Z distance to prevent overlap
			// When a card is at 90 degrees to viewer, its diagonal is visible
			// We need Z such that the diagonal doesn't overlap with adjacent cards
			const minZ = diagonal / (2 * Math.sin(angleBetweenCards / 2))

			// Apply scale factor to allow manual adjustment
			return minZ * scaleFactor
		}

		// CAROUSEL RADIUS SCALE FACTOR - Adjust this to fine-tune card spacing
		// Lower values = cards closer together, Higher values = cards farther apart
		const CAROUSEL_RADIUS_SCALE = 0.355

		// Create matchMedia instance
		const mm = gsap.matchMedia()

		// Animation variables for easier debugging
		const configs = {
			// Mobile (default) - 200px x 200px card
			'(max-width: 599px)': {
				radius: calculateCardCarouselRadius(
					200,
					200,
					3,
					CAROUSEL_RADIUS_SCALE
				),
			},
			// Tablet - 350px x 350px card
			'(min-width: 600px) and (max-width: 949px)': {
				radius: calculateCardCarouselRadius(
					350,
					350,
					3,
					CAROUSEL_RADIUS_SCALE
				),
			},
			// Desktop - 600px x 600px card
			'(min-width: 950px)': {
				radius: calculateCardCarouselRadius(
					600,
					600,
					3,
					CAROUSEL_RADIUS_SCALE
				),
			},
		}

		// Apply animations for each breakpoint
		Object.entries(configs).forEach(([mediaQuery, config]) => {
			mm.add(mediaQuery, () => {
				const cardsArr = gsap.utils.toArray(
					cards.map(card => `.${card.className}`)
				)

				gsap.set(cardsArr, {
					rotationX: i => (i * 360) / cardsArr.length,
					transformOrigin: '50% 50% ' + -config.radius + 'px',
				})

				const cardsTl = gsap.timeline({
					repeat: -1,
					scrollTrigger: {
						trigger: '.introSection',
						start: 'top top',
						end: 'bottom top',
						toggleActions: 'play pause resume resume',
					},
				})

				for (let i = 0; i < cardsArr.length; i++) {
					const rotateReg = new RegExp(
						/(?<=rotateX\()(.*?)(?=\s*deg\))/gm
					)
					cardsTl.to(
						cardsArr,
						{
							rotationX: `+=${360 / cardsArr.length}`,
							rotationY: `+=360`,
							duration: 7.5,
							ease: 'elastic.in',
							onComplete: () => {
								const current = cards[i].ref.current
								if (current) {
									const match =
										current.style['transform'].match(
											rotateReg
										)
									if (match) {
										const rotation = Number(match[0])
										switch (rotation) {
											case 120:
												setCurrentTitle('Learner')
												onTitleChange?.('Learner')
												break
											case 360:
												setCurrentTitle('Tinkerer')
												onTitleChange?.('Tinkerer')
												break
											case 600:
												setCurrentTitle(
													'Software Engineer'
												)
												onTitleChange?.(
													'Software Engineer'
												)
												break
										}
									}
								}
							},
						},
						'+=3'
					)
				}
				cardsTl.play()
			})
		})

		// Cleanup function to revert animations
		return () => {
			mm.revert()
		}
	}, [])

	useGSAP(() => {
		const cardsArr = gsap.utils.toArray(
			cards.map(card => `.${card.className}`)
		)
		const cardsShowTl = gsap.timeline({})
		cardsShowTl.to(cardsArr, {
			autoAlpha: 1,
			duration: 3,
			delay: 4,
			ease: 'power2.inOut',
		})
	}, [isLoaded])

	return (
		<div className={styles.titles}>
			<div className={styles.cards}>
				<h2 className={styles.text}>I'm a</h2>
				<div className={styles.drag}></div>

				{cards.map(card => (
					<Card
						key={`card-${card.className}`}
						ref={card.ref}
						title={card.title}
						className={card.className}>
						{card.children}
					</Card>
				))}
			</div>
		</div>
	)
}

export default TitleCards
