import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FootballSVG, PostThrowSVG, PreThrowSVG } from './SVGs'
import { cn } from '@/utils/react'

import styles from './Quarterback.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function QuarterBack() {
	useGSAP(() => {
		const start1 = 100
		const end1 = 200
		const start2 = start1 + end1

		// Quarterback pre throw
		const quarterBackStartTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.walkons',
				start: `top center-=${start1}px`,
				end: `+=${end1}px`,
				toggleActions: 'play none resume reverse',
			},
		})
		quarterBackStartTl.to(`.${styles.svgPre}`, {
			x: 0,
			autoAlpha: 1,
		})

		// Quarterback post throw
		const quarterBackEndTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.walkons',
				start: `top center-=${start2}px`,
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		quarterBackEndTl.to(`.${styles.svgPre}`, {
			x: 150,
			autoAlpha: 0,
		})
		quarterBackEndTl.to(
			`.${styles.svgPost}`,
			{
				x: 0,
				autoAlpha: 1,
			},
			'< += .5'
		)
		quarterBackEndTl.to(
			`.${styles.svgFootball}`,
			{
				x: 0,
				autoAlpha: 1,
			},
			'< += .1'
		)
	})

	return (
		<div className={styles.quarterback}>
			<div>
				<PreThrowSVG className={cn(styles.svg, styles.svgPre)} />
			</div>

			<div>
				<PostThrowSVG className={cn(styles.svg, styles.svgPost)} />
			</div>

			<div className={styles.footballContainer}>
				<FootballSVG className={cn(styles.svg, styles.svgFootball)} />
			</div>
		</div>
	)
}
