import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './Chapter6.module.scss'
import { useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)

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
				end: '+=4000',
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
			},
		})
		lightExit.to(`.lightContainer`, {
			autoAlpha: 0,
			y: -200,
			duration: 1,
		})
	}, [])

	const title = 'Going Pro'

	const line1 =
		'After a couple of years of learning and building personal projects,'
	const line2 = 'I landed my first full-time dev job in 2021.'
	const line3 = "I've been building software professionally ever since,"
	const line4 = ` while continuing to work on passion projects at home.`
	return (
		<div id='Chapter6' className={cn('chapter6', styles.chapter6)}>
			<div ref={containerRef} className={styles.container}>
				<h1 className={cn('c6-title', styles.title)}>{title}</h1>
				<p className={cn(styles.line, styles.line1)}>{line1}</p>
				<p className={cn(styles.line, styles.line2)}>{line2}</p>
				<p className={cn(styles.line, styles.line3)}>{line3}</p>
				<p className={cn(styles.line, styles.line4)}>{line4}</p>
			</div>
		</div>
	)
}

export default Chapter6
