import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './Graphs.module.scss'
import { interpolateColors } from '@/utils/styles'
import { cn } from '@/utils/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const barColors = interpolateColors('00ffff', '3d248e', 15)

const Bar = () => {
	useGSAP(() => {
		// Set bar colors
		gsap.set(`.${styles.main} > .${styles.bar}`, {
			backgroundColor: i => barColors[i],
		})
		gsap.set(`.${styles.overflow} > .${styles.bar}`, {
			backgroundColor: i => barColors[i + 6],
		})
		gsap.set(`#barSwipe > div`, {
			backgroundColor: i => barColors[i + 11],
		})

		const mainBarTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: 'top top-=2200px',
				end: '+=1px',
				onUpdate: self => {
					mainBarTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})

		mainBarTl.to(`.${styles.main} > .${styles.bar}`, {
			scale: 1,
			delay: 1,
			stagger: 0.2,
		})
		const mainBarTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=100px',
				onUpdate: self => {
					mainBarTransitionTl.reversed(
						self.direction > 0 ? false : true
					)
				},
			},
		})
		mainBarTransitionTl.to(`.${styles.barContainer}`, {
			y: 72,
		})

		const overflowTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top bottom+=1000px',
				end: '+=200px',
				onUpdate: self => {
					overflowTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		overflowTl.to(`.${styles.barLast}`, {
			duration: 0.15,
			boxShadow: '-4px 0px 2px 0px #000800ff inset',
		})
		overflowTl.to(
			`.${styles.overflow} > .${styles.bar}`,
			{
				scale: 1,
				stagger: 0.1,
			},
			'<'
		)
		overflowTl.set(`#barSwipe`, {
			top: 0,
			autoAlpha: 1,
		})
		overflowTl.to(`#barSwipe > div`, {
			scale: 1,
			stagger: 0.1,
		})
		overflowTl.to('.graphs', {
			duration: 0.01,
			autoAlpha: 0,
		})
		overflowTl.to(
			'.spreadsheet',
			{
				duration: 0.01,
				autoAlpha: 0,
			},
			'<'
		)
		overflowTl.to(
			'.chapter3 > div',
			{
				duration: 0.01,
				autoAlpha: 0,
			},
			'<'
		)
	}, [])

	return (
		<>
			<div className={styles.barContainer}>
				<div className={styles.main}>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={cn(styles.bar, styles.barLast)}></div>
					<div className={styles.overflow}>
						<div className={styles.bar}></div>
						<div className={styles.bar}></div>
						<div className={styles.bar}></div>
						<div className={styles.bar}></div>
						<div className={styles.bar}></div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Bar
