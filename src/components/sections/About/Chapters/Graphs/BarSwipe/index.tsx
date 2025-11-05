import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './BarSwipe.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const BarSwipe = () => {
	useGSAP(() => {
		const exitTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top center+=400px',
				end: '+=1000px',
				toggleActions: 'play none none reverse',
				scrub: true,
				fastScrollEnd: true,
			},
		})
		exitTransitionTl.set(`.${styles.swipe}`, {
			autoAlpha: 1,
			duration: 0.1,
		})
		exitTransitionTl.to(`.${styles.swipe}`, {
			yPercent: -100,
			duration: 2.5,
		})
		exitTransitionTl.to(`.${styles.swipe}`, {
			autoAlpha: 0,
			duration: 0.5,
		})
	})

	return (
		<div id='barSwipe' className={styles.swipe}>
			<div className={styles.bar}></div>
			<div className={styles.bar}></div>
			<div className={styles.bar}></div>
			<div className={styles.bar}></div>
		</div>
	)
}

export default BarSwipe
