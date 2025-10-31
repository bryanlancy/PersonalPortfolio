import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import styles from './Graphs.module.scss'
import { cn } from '@/utils/react'
import Bar from './Bar'
import Pie from './Pie'
import Scatter from './Scatter'
import { NoSsr } from '@/utils/next'
import { useScrollTriggerPause } from '@/hooks'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Graphs = () => {
	const graphsRef = useRef<HTMLDivElement>(null)
	const { registerTimeline } = useScrollTriggerPause(graphsRef, '100vh')

	useGSAP(() => {
		// Timeline for Intro
		const graphTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=2200px`,
				end: '+=1000px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		registerTimeline(graphTl)

		graphTl.to(`.${styles.graphs}`, {
			duration: 0.1,
			autoAlpha: 1,
		})

		// Timeline for transition between Chapter 2 and Chapter 3
		const graphTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: `top center`,
				end: '+=600px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		registerTimeline(graphTransitionTl)
		graphTransitionTl.to(`.${styles.graphs}`, {
			y: -400,
		})
		// Timeline for exit transition
		const graphExitTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top bottom',
				end: '+=200px',
				fastScrollEnd: true,
				toggleActions: 'play complete none reverse',
			},
		})
		registerTimeline(graphExitTl)
		graphExitTl.to(`.graphs`, {
			duration: 0.5,
			autoAlpha: 0,
		})
	}, [])

	return (
		<div ref={graphsRef} className={cn('graphs', styles.graphs)}>
			<Bar />
			<Pie />
			<NoSsr>
				<Scatter />
			</NoSsr>
		</div>
	)
}

export default Graphs
