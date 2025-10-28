import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'
import Calendar from './Calendar'
import Projects from './Projects'

import styles from './Chapter6.module.scss'
import Container from '@/utils/components/Container'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/*
	Animation timeline

	Animation:
	Calendar slides in and starts flipping
	Projects stack up in the hobby pile
	When the calendar reaches 2021 it stops flipping and the year glows
	The first professional project/job appears


	Transition:

*/

const Chapter6 = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		// Container scroll with screen
		gsap.to(containerRef.current, {
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top top',
				end: '+=3000',
				pin: true,
			},
		})

		// Fade out light from previous animations
		const lightExit = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: 'top bottom',
				end: '+=500px',
				scrub: true,
				fastScrollEnd: true,
			},
		})
		lightExit.to(`.lightContainer`, {
			autoAlpha: 0,
			y: -200,
			duration: 1,
		})

		// Line 1 Animation
		const line1Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: 'top top-=240px',
				end: '+=200px',
				toggleActions: 'play none resume reverse',
			},
		})
		line1Tl.to(`.${styles.line1}`, {
			autoAlpha: 1,
		})
		// Line 2 Animation
		const line2Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: 'top top-=1800px',
				end: '+=200px',
				toggleActions: 'play none resume reverse',
			},
		})
		line2Tl.to(`.${styles.line2}`, {
			autoAlpha: 1,
		})
		// Line 3 Animation
		const line3Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: 'top top-=2200px',
				end: '+=200px',
				toggleActions: 'play none resume reverse',
			},
		})
		line3Tl.to(`.${styles.line3}`, {
			autoAlpha: 1,
		})
		// Line 4 Animation
		const line4Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: 'top top-=2600px',
				end: '+=200px',
				toggleActions: 'play none resume reverse',
			},
		})
		line4Tl.to(`.${styles.line4}`, {
			autoAlpha: 1,
		})
	}, [])

	const title = 'Going Pro'

	const line1 =
		'After a couple of years of learning and building personal projects...'
	const line2 = 'I landed my first full-time dev job in 2021.'
	const line3 = "I've been building software professionally ever since,"
	const line4 = ` while continuing to work on passion projects at home.`
	return (
		<div id='chapter6' className={cn('chapter6', styles.chapter6)}>
			<div ref={containerRef} className={styles.container}>
				<Container>
					<h1 className={cn('c6-title', styles.title)}>{title}</h1>
					<Calendar />

					<p className={cn(styles.line, styles.line1)}>{line1}</p>
					<p className={cn(styles.line, styles.line2)}>{line2}</p>
					<p className={cn(styles.line, styles.line3)}>{line3}</p>
					<p className={cn(styles.line, styles.line4)}>{line4}</p>

					<Projects />
				</Container>
			</div>
		</div>
	)
}

export default Chapter6
