import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './Pie.module.scss'
import { cn } from '@/utils/react'

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger)

const Pie = () => {
	useGSAP(() => {
		gsap.set('circle', {
			drawSVG: 0,
			rotation: -90,
			transformOrigin: 'center center',
		})

		const pieTl = gsap.timeline({
			defaults: { duration: 1, ease: 'sine.inOut' },
			scrollTrigger: {
				trigger: '.chapter2',
				start: 'top top-=2200px',
				end: '+=600px',
				toggleActions: 'play none none reverse',
				fastScrollEnd: true,
			},
		})
		pieTl
			.to(`.${styles.pie}`, {
				duration: 0.3,
				autoAlpha: 1,
			})
			.to(`.${styles.circle1}`, { drawSVG: '0% 37%' })
			.to(`.${styles.circle2}`, { drawSVG: '37% 82%' }, 0)
			.to(`.${styles.circle3}`, { drawSVG: '82% 100%' }, 0)
			.to(
				`.${styles.circle1}`,
				{
					x: 1,
					y: -1,
					delay: 0.4,
				},
				'<'
			)

		const mm = gsap.matchMedia()

		// Laptop and larger: use top: 120px
		mm.add('(min-width: 950px)', () => {
			const pieTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: 'top center',
					end: '+=700px',
					toggleActions: 'play complete none reverse',
					fastScrollEnd: true,
				},
			})
			pieTransitionTl
				.to(`.${styles.circle1}`, {
					delay: 0.5,
					x: 0,
					y: 0,
				})
				.to(
					`.${styles.pie}`,
					{
						rotate: 120,
					},
					'<'
				)
				.to(
					`.${styles.pie}`,
					{
						top: '40px',
					},
					'<'
				)
		})

		// Below laptop: use x and top transforms
		mm.add('(max-width: 949px)', () => {
			const pieTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: 'top center',
					end: '+=700px',
					toggleActions: 'play complete none reverse',
				},
			})
			pieTransitionTl
				.to(`.${styles.circle1}`, {
					delay: 0.5,
					x: 0,
					y: 0,
				})
				.to(
					`.${styles.pie}`,
					{
						rotate: 120,
					},
					'<'
				)
				.to(
					`.${styles.pie}`,
					{
						top: '24px',
						x: -40,
					},
					'<'
				)
		})
	}, [])

	return (
		<div className={cn(styles.pie, 'pie-chart')}>
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
