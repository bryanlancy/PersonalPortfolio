import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import InertiaPlugin from 'gsap/InertiaPlugin'

import { cn } from '@/utils/react'

import styles from './TitleSections.module.scss'
import { forwardRef, RefObject, useRef, useState } from 'react'

gsap.registerPlugin(useGSAP, InertiaPlugin)

interface CardProps {
	title: string
	className: string
}
export interface CardPropsWithRef extends CardProps {
	ref: RefObject<HTMLDivElement>
}
const Card = forwardRef<HTMLDivElement, CardProps>(
	({ title, className }, ref) => {
		return (
			<div className={cn(styles.card, className)} ref={ref}>
				<h2>{title}</h2>
			</div>
		)
	}
)

const TitleCards = () => {
	const cards: (CardProps & { ref: RefObject<HTMLDivElement> })[] = [
		{
			title: 'Software Engineer',
			className: styles.software,
			ref: useRef<HTMLDivElement>(null),
		},
		{
			title: 'Tinkerer',
			className: styles.tinkerer,
			ref: useRef<HTMLDivElement>(null),
		},
		{
			title: 'Learner',
			className: styles.learner,
			ref: useRef<HTMLDivElement>(null),
		},
	]
	const [currentTitle, setCurrentTitle] = useState<string>(cards[0].title)

	useGSAP(() => {
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
			cardsTl.to(cardsArr, {
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
									break
								case 360:
									setCurrentTitle('Tinkerer')
									break
								case 600:
									setCurrentTitle('Software Engineer')
									break
							}
						}
					}
				},
			})
		}
	}, [])

	return (
		<div className={styles.titles}>
			<h2>{currentTitle}</h2>
			<div className={styles.cards}>
				<h2 className={styles.text}>I'm a</h2>
				<div className={styles.drag}></div>

				{cards.map(card => (
					<Card
						key={`card-${card.className}`}
						ref={card.ref}
						title={card.title}
						className={card.className}
					/>
				))}
			</div>

			{/* <div className={styles.text}>
				<h2 className={styles.subtext}>
					And I'm a{' '}
					<AnimatedText
						text={'Test'}
						color={'#ff0000'}
						duration={5000}
					/>
				</h2>
			</div> */}
		</div>
	)
}

export default TitleCards
