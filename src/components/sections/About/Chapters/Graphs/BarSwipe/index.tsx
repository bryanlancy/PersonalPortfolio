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
				scrub: true,
			},
		})

		exitTransitionTl.to(`.${styles.swipe}`, {
			yPercent: -100,
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
