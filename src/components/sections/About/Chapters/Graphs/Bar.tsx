import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './Graphs.module.scss'
import { scale } from 'motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Bar = () => {
	useGSAP(() => {
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
			stagger: (i, el, list) => {
				const colors = {
					r: 100,
					g: 50,
					b: 200,
				}

				gsap.to(el, {
					backgroundColor: `rgb(${(colors.r / list.length) * i}, ${
						(colors.g / list.length) * i
					}, ${colors.b / 2 + (colors.b / 2 / list.length) * i})`,
				})

				return 0.2
			},
		})
	})

	return (
		<div className={styles.barContainer}>
			<div className={styles.main}>
				<div className={styles.bar}></div>
				<div className={styles.bar}></div>
				<div className={styles.bar}></div>
				<div className={styles.bar}></div>
				<div className={styles.bar}></div>
				<div className={styles.bar}></div>

				<div className={styles.overflow}>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
				</div>
			</div>

			<div className={styles.swipe}>
				<div className={styles.bar}></div>
				<div className={styles.bar}></div>
				<div className={styles.bar}></div>
				<div className={styles.bar}></div>
			</div>
		</div>
	)
}

export default Bar
