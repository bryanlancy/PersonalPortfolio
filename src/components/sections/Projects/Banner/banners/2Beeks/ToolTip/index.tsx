import { FC, useRef } from 'react'
import Image from 'next/image'
import { Old_Standard_TT } from 'next/font/google'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { cn } from '@/utils/react'

import styles from './ToolTip.module.scss'

const ebGaramond = Old_Standard_TT({
	subsets: ['latin'],
	weight: ['400', '700'],
})

interface ToolTipsProps {
	show: boolean
}
const ToolTip: FC<ToolTipsProps> = ({ show }) => {
	const tl = useRef(gsap.timeline({ reversed: true }))

	const apiaryImageUrl =
		'https://upload.wikimedia.org/wikipedia/commons/8/84/Apiary_in_Bashkortostan%2C_Russia.jpg'

	const definition = 'a place where bees are kept; a collection of beehives.'
	// const origin = [
	// 	['latin', 'apis', 'bee'],
	// 	['latin', 'apiarium', null],
	// 	['mid 17th century', 'apiary', null],
	// ]
	const pronunciation = '/ˈāpēˌerē/'

	useGSAP(() => {
		tl.current.fromTo(
			`.${styles.container}`,
			{
				scale: 0,
				rotate: 0,
				x: -160,
				y: -200,
				autoAlpha: 0,
				duration: 0.1,
			},
			{
				scale: 1,
				rotate: 360,
				x: 0,
				y: 0,
				autoAlpha: 1,
				duration: 0.5,
				ease: 'elastic.out',
			}
		)
	}, [])
	useGSAP(() => {
		tl.current.reversed(!show)
	}, [show])

	return (
		<div className={cn(styles.container, ebGaramond.className)}>
			<Image
				className={styles.image}
				src={apiaryImageUrl}
				alt='apiary'
				width={320}
				height={240}
			/>

			<div className={styles.frame}></div>
			<div className={styles.word}>
				<h2>apiary</h2>
				<em>{pronunciation}</em>
			</div>
			<div className={styles.definition}>
				<b>{definition}</b>
			</div>
		</div>
	)
}

export default ToolTip
