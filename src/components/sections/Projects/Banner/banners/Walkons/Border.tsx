import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { BarStoolsSVG, BarSVG } from './Quarterback/SVGs'
import { cn } from '@/utils/react'

import styles from './Border.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Border() {
	useGSAP(() => {
		// Bar Background
		const barTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.walkons',
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		barTl.to(`.${styles.barBackground}`, {
			y: 0,
			autoAlpha: 1,
		})
		barTl.to(
			`.${styles.bar}`,
			{
				y: 0,
				autoAlpha: 1,
			},
			'<+=.25'
		)
		barTl.to(
			`.${styles.capContainer}`,
			{
				y: 0,
				autoAlpha: 1,
			},
			'<'
		)
		barTl.to(
			`.${styles.barStools}`,
			{
				y: '100%',
				autoAlpha: 1,
			},
			'<+=.2'
		)
	})

	return (
		<>
			<div className={styles.barBackground}>
				<div className={styles.capContainer}>
					<div className={cn(styles.barCap, styles.left)}></div>
					<div className={cn(styles.barCap, styles.right)}></div>
				</div>
			</div>
			<div className={styles.bar}>
				<BarSVG className={styles.svgBar} />
			</div>
			<div className={styles.barStools}>
				<BarStoolsSVG className={styles.svgStools} />
			</div>
		</>
	)
}
