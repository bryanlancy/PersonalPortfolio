import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'
import Calendar from './Calendar'
import Container from '@/utils/components/Container'
import ChapterScrollContainer from '@/components/ChapterScrollContainer'
import Desk from './Desk'

import styles from './Chapter6.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Chapter6 = () => {
	useGSAP(() => {
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
			<ChapterScrollContainer
				triggerClassName='c6-container'
				scrollDistance={3000}
				className={styles.container}>
				<Container>
					<h1 className={cn('c6-title', styles.title)}>{title}</h1>
					<Calendar />

					<p className={cn(styles.line, styles.line1)}>{line1}</p>
					<p className={cn(styles.line, styles.line2)}>{line2}</p>
					<p className={cn(styles.line, styles.line3)}>{line3}</p>
					<p className={cn(styles.line, styles.line4)}>{line4}</p>

					<Desk />
				</Container>
			</ChapterScrollContainer>
		</div>
	)
}

export default Chapter6
