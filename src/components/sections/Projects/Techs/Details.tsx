import { FC, Ref, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { createBackground } from '../../Contact/ContactCard'
import { cn } from '@/utils/react'
import { Technology } from '@/app/data/technology-list'

import styles from './Details.module.scss'

gsap.registerPlugin(useGSAP)

interface DetailsProps {
	techRef: Ref<any>
	tech: Technology | null
	hide: Function
}

interface ContentProps {
	tech: Technology
	hide: Function
}
const Content: FC<ContentProps> = ({ tech, hide }) => {
	const { color, title, icon } = tech
	const multiTech = useRef(title.includes('/'))
	const [name1, setName1] = useState(title)
	const [name2, setName2] = useState<string | null>(null)
	const [icon1, setIcon1] = useState<Technology['icon']>()
	const [icon2, setIcon2] = useState<Technology['icon']>()

	const timelineRef = useRef(gsap.timeline())

	useGSAP(() => {
		if (multiTech.current) {
			const [name1Temp, name2Temp] = title.split('/')

			if (Array.isArray(icon)) {
				const [iconTemp1, iconTemp2] = icon
				setIcon1(iconTemp1)
				setIcon2(iconTemp2)
			}
			setName1(name1Temp)
			setName2(name2Temp)
		} else {
			setName1(title)
			setIcon1(icon)
			setName2(null)
			setIcon2(null)
		}

		gsap.set(`.${styles.tech1}`, {
			top: '90%',
			left: '10%',
			xPercent: -50,
			yPercent: -50,
		})
		gsap.set(`.${styles.tech2}`, {
			top: '5%',
			left: '90%',
			xPercent: -50,
			yPercent: -50,
		})

		const offset = 15
		// Move titles to the middle
		timelineRef.current.to(`.${styles.tech1}`, { top: '50%' })
		timelineRef.current.to(`.${styles.tech2}`, { top: '50%' }, '<')
		// If 2 techs, offset each a little to meet
		timelineRef.current.to(`.${styles.tech1}`, {
			left: multiTech.current ? `${50 - offset}%` : '50%',
		})
		timelineRef.current.to(
			`.${styles.tech2}`,
			{ left: `${50 + offset}%` },
			'<'
		)

		gsap.fromTo(
			`.${styles.close}`,
			{ scale: 0, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.5 }
		)
	}, [tech])

	function hideDetails() {
		timelineRef.current.to(`.${styles.tech1}`, {
			left: '10%',
			duration: 0.25,
		})
		timelineRef.current
			.to(`.${styles.tech2}`, { left: '90%', duration: 0.25 }, '<')
			.call(() => hide())

		timelineRef.current.to(`.${styles.tech1}`, {
			top: '90%',
			duration: 0.25,
		})
		timelineRef.current.to(
			`.${styles.tech2}`,
			{ top: '5%', duration: 0.25 },
			'<'
		)
	}

	return (
		<div
			className={cn(styles.content, styles[tech.name])}
			style={{ background: createBackground(color) }}>
			<FontAwesomeIcon
				onClick={hideDetails}
				className={styles.close}
				icon={faCircleXmark}
			/>
			<div className={styles.tech1}>
				<h3 className={styles.title}>{name1}</h3>
			</div>
			<div className={cn(styles.icon, styles.background1)}>{icon1}</div>
			<div className={styles.tech2}>
				{name2 && <h3 className={styles.title}>{name2}</h3>}
			</div>
			<div className={cn(styles.icon, styles.background2)}>{icon2}</div>
		</div>
	)
}

const Details: FC<DetailsProps> = ({ techRef, tech, hide }) => {
	return (
		<div ref={techRef} className={styles.container}>
			{tech && <Content tech={tech} hide={hide} />}
		</div>
	)
}

export default Details
