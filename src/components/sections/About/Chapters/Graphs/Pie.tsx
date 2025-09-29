import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './Graphs.module.scss'

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger)

const Pie = () => {
	useGSAP(() => {
		gsap.set('circle', {
			drawSVG: 0,
			rotation: -90,
			transformOrigin: 'center center',
		})

		const pieTl = gsap
			.timeline({
				defaults: { duration: 1, ease: 'sine.inOut' },
				scrollTrigger: {
					trigger: '.chapter2',
					start: 'top top-=2200px',
					end: '+=1px',
					onUpdate: self => {
						pieTl.reversed(self.direction > 0 ? false : true)
					},
				},
			})

			.to(`.${styles.circle1}`, { drawSVG: '0% 37%' })
			.to(`.${styles.circle2}`, { drawSVG: '37% 82%' })
			.to(`.${styles.circle3}`, { drawSVG: '82% 100%' })
			.to(`.${styles.circle1}`, {
				x: 1,
				y: -1,
				delay: 0.5,
			})

		const pieTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=1px',
				onUpdate: self => {
					pieTransitionTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		pieTransitionTl.to(`.${styles.circle1}`, {
			x: 0,
			y: 0,
		})
	}, [])

	return (
		<div className={styles.pie}>
			<svg
				id='demo'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 10 10'>
				<circle className={styles.circle1} r='2.1' cx='5' cy='5' />
				<circle className={styles.circle2} r='2.1' cx='5' cy='5' />
				<circle className={styles.circle3} r='2.1' cx='5' cy='5' />
			</svg>
		</div>
	)
}

export default Pie
