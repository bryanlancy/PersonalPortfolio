import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './Bar.module.scss'
import { interpolateColors } from '@/utils/styles'
import { cn } from '@/utils/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const barColors = interpolateColors(['00ffff', '3d248e'], 15)

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
				end: '+=300px',
				fastScrollEnd: true,

				toggleActions: 'play complete none reverse',
			},
		})
		mainBarTl.to(`.${styles.barContainer}`, {
			duration: 0.1,
			autoAlpha: 1,
		})
		mainBarTl.to(`.${styles.main} > .${styles.bar}`, {
			scale: 1,
			delay: 1,
			stagger: 0.2,
		})
		const mm = gsap.matchMedia()

		// Tablet and mobile: use top and left positioning
		mm.add('(max-width: 949px)', () => {
			const mainBarTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: 'top center',
					end: '+=600px',
					toggleActions: 'play complete none reverse',
					fastScrollEnd: true,
				},
			})
			mainBarTransitionTl.to(`.${styles.barContainer}`, {
				delay: 0.5,
				bottom: '50vh',
				left: 24,
			})
		})

		// Laptop: use y positioning (no additional adjustment needed as SCSS handles it)
		mm.add('(min-width: 950px) and (max-width: 1239px)', () => {
			const mainBarTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: 'top center',
					end: '+=600px',
					toggleActions: 'play complete none reverse',
					fastScrollEnd: true,
				},
			})
			mainBarTransitionTl.to(`.${styles.barContainer}`, {
				bottom: '45%',
			})
		})

		// Desktop and larger: move up by 120px (from laptop position)
		mm.add('(min-width: 1240px)', () => {
			const mainBarTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: 'top center',
					end: '+=600px',
					toggleActions: 'play complete none reverse',
					fastScrollEnd: true,
				},
			})
			mainBarTransitionTl.to(`.${styles.barContainer}`, {
				delay: 0.5,
				y: -64, // 72 - 120 = -48 (moves up 120px from laptop's y: 72)
				x: -32,
			})
		})

		const overflowTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top bottom+=1000px',
				end: '+=1300px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		overflowTl.to(`.${styles.barLast}`, {
			duration: 0.15,
			boxShadow: '-4px 0px 2px 0px #000800ff inset',
		})
		overflowTl.to(`.${styles.overflow}`, {
			duration: 0.15,
			autoAlpha: 1,
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
		overflowTl.to(`.${styles.barContainer}`, {
			duration: 0.1,
			autoAlpha: 0,
		})
		overflowTl.to(`.pie-chart`, {
			duration: 0.1,
			autoAlpha: 0,
		})
		overflowTl.to(`.scatter-chart`, {
			duration: 0.1,
			autoAlpha: 0,
		})
		overflowTl.to(
			'.chapter3 > div',
			{
				duration: 0.1,
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
