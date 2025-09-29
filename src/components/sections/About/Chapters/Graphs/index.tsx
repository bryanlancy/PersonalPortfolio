import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './Graphs.module.scss'
import { cn } from '@/utils/react'
import Bar from './Bar'
import Pie from './Pie'
import Scatter from './Scatter'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Graphs = () => {
	useGSAP(() => {
		// Timeline for Intro
		const graphTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=2200px`,
				end: '+=1px',
				onUpdate: self => {
					graphTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})

		graphTl.to(`.${styles.graphs}`, {
			delay: 0.5,
			autoAlpha: 1,
		})

		// Timeline for transition between Chapter 2 and Chapter 3
		const graphTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: `top center`,
				end: '+=1px',
				onUpdate: self => {
					graphTransitionTl.reversed(
						self.direction > 0 ? false : true
					)
				},
			},
		})
		graphTransitionTl.to(`.${styles.graphs}`, {
			delay: 0.1,
			y: -400,
		})

		// Timeline for exit transition
		const graphExitTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top bottom',
				end: '+=200px',
				onUpdate: self => {
					graphExitTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		graphExitTl.to(`.graphs`, {
			delay: 0.5,
			autoAlpha: 0,
			y: -500,
		})
	}, [])

	return (
		<div className={cn('graphs', styles.graphs)}>
			<Bar />
			<Pie />
			<Scatter />
		</div>
	)
}

export default Graphs
