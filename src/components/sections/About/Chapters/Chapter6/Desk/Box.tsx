import { FC, useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './Projects.module.scss'
import { cn } from '@/utils/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBoxDollar,
	faBoxHeart,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'
import { randomInteger } from '@/utils/general'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface BoxProps {
	start: number
	endY: number
	type: 'hobby' | 'pro'
	size: number
}
const Box: FC<BoxProps> = ({ start, endY, type, size }) => {
	const boxRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		gsap.set(boxRef.current, {
			y: endY - 240,
			x: randomInteger(-10, 10),
		})
		const boxTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: `top top-=${start}px`,
				end: '+=200px',
				scrub: true,
			},
		})
		boxTl.to(boxRef.current, {
			autoAlpha: 1,
			y: endY,
		})
	}, [])

	return (
		<div
			// @ts-expect-error, setting custom css variable
			style={{ '--boxSize': `${size}px` }}
			className={cn(styles.box, [
				type === 'hobby',
				styles.hobby,
				styles.pro,
			])}
			ref={boxRef}>
			<FontAwesomeIcon
				icon={type === 'hobby' ? faBoxHeart : faBoxDollar}
				className={styles.icon}
			/>
		</div>
	)
}

export default Box
