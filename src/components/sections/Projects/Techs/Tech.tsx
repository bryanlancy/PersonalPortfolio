import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	FC,
	MouseEventHandler,
	MutableRefObject,
	useEffect,
	useState,
} from 'react'
import { faArrowRight } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

import { cn } from '@/utils/react'
import { createBackground } from '../../Contact/ContactCard'
import FancyText from '@/utils/components/FancyText'
import { Technology } from '@/app/data/technology-list'

import styles from './Techs.module.scss'
import {
	useHover,
	useMouse,
	useThrottle,
	useWindowSize,
} from '@uidotdev/usehooks'
import { mapRange } from '@/utils/general'

interface TechProps {
	tech: Technology
	className?: string
	onClick?: MouseEventHandler<any>
	index?: number
	techRef: MutableRefObject<HTMLLIElement>
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

const mouseMove: MouseEventHandler<any> = e => {
	const { currentTarget: t } = e

	// Filter any events not related to `li` element

	if (t.tagName !== 'LI') return
	const rect = t.getBoundingClientRect()

	const width = rect.width
	const height = rect.height

	const mouseX = e.clientX - rect.left
	const mouseY = e.clientY - rect.top

	const xPct = mouseX / width
	const yPct = mouseY / height
}

/*
	TODO Add holographic hover effect
	Use icons as part of holographic layer
	https://codepen.io/simeydotme/pen/abYWJdX
	https://www.joshdance.com/100/day50/
*/

const Tech: FC<TechProps> = ({ tech, techRef, className, onClick, index }) => {
	let rotation = 10
	if (rotateIgnore.includes(tech.name)) rotation = 0
	if (rotateInverse.includes(tech.name)) rotation *= -1

	if (!tech) {
		console.error(`No technology provided.`)
		return null
	}

	const [animateText, setAnimateText] = useState(false)

	const { title, color, icon } = tech
	const [name, setName] = useState(title)
	const [name2, setName2] = useState<string | null>(null)
	const [icon1, setIcon1] = useState<Technology['icon']>()
	const [icon2, setIcon2] = useState<Technology['icon']>()
	const [mousePct, setMousePct] = useState<[number, number]>()
	const [boundingRect, setBoundingRect] = useState(
		techRef.current?.getBoundingClientRect()
	)

	const [mouseState, mouseRef] = useMouse()
	const [hoverRef, isHovered] = useHover()
	const throttledCoordState = useThrottle(mouseState, 50)
	const { width } = useWindowSize()

	// Update bounding box on resize
	useEffect(() => {
		setBoundingRect(techRef.current?.getBoundingClientRect())
	}, [width])

	//
	useEffect(() => {
		const { elementX, elementY } = throttledCoordState
		if (isHovered) {
			const xPct = Number((elementX / boundingRect.width).toFixed(3))
			const yPct = Number((elementY / boundingRect.height).toFixed(3))
			setMousePct([xPct, yPct])
		} else setMousePct([0.5, 0.5])
	}, [throttledCoordState, isHovered])

	useGSAP(() => {
		if (mousePct) {
			const [x, y] = mousePct
			// Based on mouse y position in `li`
			const rotateX = -mapRange(y, [0, 1], [-20, 20])
			// Based on mouse x position in `li`
			const rotateY = rotation + mapRange(x, [0, 1], [-20, 20])

			gsap.to(techRef.current, {
				rotateX,
				rotateY,
			})
		}
	}, [mousePct])

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

		if (index !== undefined) {
			gsap.fromTo(
				`.tech-${tech.name}`,
				{
					autoAlpha: 0,
					y: 100,
					rotateY: -rotation * 6,
				},
				{
					autoAlpha: 1,
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
		}
	}, [tech])

	return (
		<li
			ref={el => {
				if (el) {
					mouseRef.current = el
					techRef.current = el
					hoverRef(el)
				}
			}}
			onMouseEnter={() => setAnimateText(true)}
			onMouseLeave={() => setAnimateText(false)}
			onMouseMove={mouseMove}
			className={cn(
				'tech',
				styles.tech,
				styles[tech.name],
				`tech-${tech.name}`,
				className
			)}
			style={{
				// @ts-expect-error
				'--primaryColor': color,
				background: createBackground(color),
			}}>
			<div className={styles.tech1}>
				<h3 className={styles.title}>{name}</h3>
			</div>
			<div className={cn(styles.icon, styles.background1)}>{icon1}</div>

			{name2 && (
				<div className={styles.tech2}>
					<h3 className={styles.title2}>{name2}</h3>
				</div>
			)}
			{icon2 && (
				<div className={cn(styles.icon, styles.background2)}>
					{icon2}
				</div>
			)}

			<div onClick={onClick} className={cn(styles.link, styles.fancy)}>
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
