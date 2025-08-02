import { FC, useState } from 'react'
import { faArrowRight } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import { cn } from '@/utils/react'
import { createBackground } from '../../Contact/ContactCard'
import FancyText from '@/utils/components/FancyText'
import { Technology } from '@/app/data/technology-list'
import { techList } from '@/app/data'

import styles from './Techs.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

interface TechProps {
	name: string
	type: string
	category?: string
	index: number
}

const rotateInverse = [
	'figma',
	'typescriptJs',
	'tailwinds',
	'gsapMotion',
	'docker',
	'craft',
	'cpp',
]
const rotateIgnore = ['cloudflare']

const Tech: FC<TechProps> = ({ name: techName, type, index }) => {
	const techInfo = techList[techName]
	if (!techInfo) {
		console.error(`Could not find tech info for "${techName}".`)
		return null
	}

	gsap.registerPlugin(useGSAP)
	gsap.registerPlugin(ScrollTrigger)

	const [animateText, setAnimateText] = useState(false)

	const { title, color, icon } = techInfo
	const [name, setName] = useState(title)
	const [name2, setName2] = useState<string | null>(null)
	const [icon1, setIcon1] = useState<Technology['icon']>()
	const [icon2, setIcon2] = useState<Technology['icon']>()

	useGSAP(() => {
		if (name.includes('/')) {
			const [name1, nameTemp] = name.split('/')

			if (Array.isArray(icon)) {
				const [iconTemp1, iconTemp2] = icon
				setIcon1(iconTemp1)
				setIcon2(iconTemp2)
			}
			setName(name1)
			setName2(nameTemp)
		} else {
			setIcon1(icon)
		}

		let rotation = 10
		if (rotateIgnore.includes(techName)) rotation = 0
		if (rotateInverse.includes(techName)) rotation *= -1
		gsap.fromTo(
			`.tech-${techName}`,
			{
				opacity: 0,
				y: 100,
				rotateY: -rotation * 2,
			},
			{
				opacity: 1,
				y: 0,
				rotateY: rotation,

				scrollTrigger: {
					trigger: `.proTitle`,
					start: 'top center',
				},

				duration: 0.75,
				delay: index * 0.15,
			}
		)
	}, [techName])

	return (
		<li
			onMouseEnter={() => setAnimateText(true)}
			onMouseLeave={() => setAnimateText(false)}
			className={cn(
				styles.tech,
				styles[techName],
				`${type}Tech`,
				`tech-${techName}`
			)}
			style={{
				// @ts-expect-error
				'--primaryColor': color,
				background: createBackground(color),
			}}>
			<div className={styles.tech1}>
				<h3 className={styles.title}>{name}</h3>
			</div>
			<div className={styles.background1}>{icon1}</div>

			{name2 && (
				<div className={styles.tech2}>
					<h3 className={styles.title2}>{name2}</h3>
				</div>
			)}
			{icon2 && <div className={styles.background2}>{icon2}</div>}

			<div className={cn(styles.link, styles.fancy)}>
				<FancyText shouldAnimate={animateText}>Learn More </FancyText>
				<FontAwesomeIcon
					className={cn(styles.arrow, [animateText, styles.show])}
					icon={faArrowRight}
				/>
			</div>
		</li>
	)
}

export default Tech
