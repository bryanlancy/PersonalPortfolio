import { CSSProperties, useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
	faMessageSmile,
	faPhoneArrowDownLeft,
	faPhoneArrowUpRight,
	faCommentSms,
	faEnvelope,
	faAt,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'

import { randomInteger } from '@/utils/general'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Drops.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Droptions extends CSSProperties {
	/** Size of the raindrop */
	'--size': string
	/** Horizonal position of raindrop */
	'--left': string
}

interface DropProps {
	id: string
	droptions: Droptions
	deleteDrop: Function
}

export default function Drop({ id, droptions, deleteDrop }: DropProps) {
	const dropRef = useRef<HTMLDivElement>(null)
	const icons = [
		faMessageSmile,
		faPhoneArrowDownLeft,
		faPhoneArrowUpRight,
		faCommentSms,
		faEnvelope,
		faAt,
	]

	useGSAP(() => {
		const dropDuration = randomInteger(8, 14)
		const dropDelay = randomInteger(0, 3)
		const dropTl = gsap.timeline({
			onComplete: () => deleteDrop(id),
			scrollTrigger: {
				trigger: '.mercury',
				start: 'top center-=100px',
				end: '+=400px',
			},
		})
		dropTl.to(dropRef.current, {
			bottom: '0%',
			duration: dropDuration,
			delay: dropDelay,
		})
		dropTl.to(
			dropRef.current,
			{
				autoAlpha: 0,
				duration: 0.5,
			},
			`-=${dropDuration * 0.4}`
		)
	}, [])
	return (
		<div className={styles.drop} style={{ ...droptions }} ref={dropRef}>
			<FontAwesomeIcon
				className={styles.icon}
				icon={icons[randomInteger(0, icons.length - 1)]}
			/>
		</div>
	)
}
