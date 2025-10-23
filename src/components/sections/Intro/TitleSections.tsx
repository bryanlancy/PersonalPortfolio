'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@/utils/react'

import { forwardRef, RefObject, useRef, useState } from 'react'
import {
	faBook,
	faLaptopCode,
	faScrewdriverWrench,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'
import styles from './TitleSections.module.scss'
import { generateSpiralPath } from '@/utils/svg'
import { NoSsr } from '@/utils/next'

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
	const width = 800
	const height = 800
	const endRadius = 2.5
	const cards: (CardProps & { ref: RefObject<HTMLDivElement> })[] = [
		{
			title: 'Software Engineer',
			className: styles.software,
			ref: useRef<HTMLDivElement>(null),
			children: (
				<div className={styles.softwareContent}>
					<svg className={styles.backgroundSvg}>
						<path
							className={styles.spiralPath}
							d={generateSpiralPath({
								width,
								height,
								type: 'rectangular',
								turns: 8,
								pointsPerTurn: 4,
								startRadius: 0.01,
								endRadius,
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
						<path
							className={styles.spiralPath}
							d={generateSpiralPath({
								width,
								height,
								type: 'circular',
								turns: 12,
								pointsPerTurn: 50,
								startRadius: 0.05,
								endRadius,
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
						<path
							className={styles.spiralPath}
							d={generateSpiralPath({
								width,
								height,
								type: 'hexagonal',
								turns: 10,
								pointsPerTurn: 6,
								startRadius: 0.01,
								endRadius,
							})}
						/>
					</svg>
					<FontAwesomeIcon className={styles.icon} icon={faBook} />
				</div>
			),
		},
	]
	const [currentTitle, setCurrentTitle] = useState<string>(cards[0].title)

	useGSAP(() => {
		const spiralTimeline = gsap.timeline({ repeat: -1 })
		spiralTimeline.to(`.${styles.backgroundSvg}`, {
			rotate: '+=360',

			duration: 60,
			ease: 'none',
		})

		const cardsArr = gsap.utils.toArray(
			cards.map(card => `.${card.className}`)
		)

		const radius = 173
		gsap.set(cardsArr, {
			rotationX: i => (i * 360) / cardsArr.length,
			transformOrigin: '50% 50% ' + -radius + 'px',
		})

		const cardsTl = gsap.timeline({
			repeat: -1,
		})

		for (let i = 0; i < cardsArr.length; i++) {
			const rotateReg = new RegExp(/(?<=rotateX\()(.*?)(?=\s*deg\))/gm)
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
								current.style['transform'].match(rotateReg)
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
										setCurrentTitle('Software Engineer')
										onTitleChange?.('Software Engineer')
										break
								}
							}
						}
					},
				},
				'+=3'
			)
		}
	}, [])

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
