import {
	faDesktop,
	faFaceAwesome,
	faFaceThinking,
	faUserTie,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@awesome.me/kit-ddd907bdb7/icons/sharp/thin'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Background from './Background'
import { cn } from '@/utils/react'
import Container from '@/utils/components/Container'
import ChapterScrollContainer from '@/components/ChapterScrollContainer'

import styles from './Chapter1.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Chapter1 = () => {
	const title = 'How it Started'

	const line1 = "I've always been drawn to technology"
	const line2 =
		" but I didn't realize how little I understood it until my grandfather once asked how computers work."
	const line3 =
		"That question sparked the curiosity that's shaped my career ever since."

	const line1Offset = 600
	const line2Offset = line1Offset + 400
	const line3Offset = line2Offset + 600
	useGSAP(() => {
		// Emoji animations
		const emojiTl = gsap.timeline()
		emojiTl.set('.c1-emoji', {
			top: '30%',
		})
		emojiTl.to('.c1-emoji', {
			autoAlpha: 1,
			top: '50%',
			scrollTrigger: {
				trigger: '.c1-title',
				start: 'bottom top+=300px',
				end: '+=200',
				scrub: true,
			},
		})
		emojiTl.to(
			'.c1-emoji',
			{
				y: 200,
				scrollTrigger: {
					trigger: '.chapter1',
					start: 'top top',
					scrub: true,
				},
			},
			'<'
		)

		// Responsive emoji x positioning using gsap.matchMedia
		const mm = gsap.matchMedia()

		mm.add('(max-width: 599px)', () => {
			emojiTl.to(`.${styles.me}`, {
				x: 100,
				scrollTrigger: {
					trigger: '.chapter1',
					start: 'top top-=600px',
					end: '+=400px',
					scrub: true,
				},
			})
		})

		mm.add('(min-width: 600px)', () => {
			emojiTl.to(`.${styles.me}`, {
				x: -100,
				scrollTrigger: {
					trigger: '.chapter1',
					start: 'top top-=600px',
					end: '+=400px',
					scrub: true,
				},
			})
		})

		// Title animations
		const titleTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top',
				end: '+=900',
				toggleActions: 'play none none reset',
			},
		})
		titleTl.to('.c1-title', {
			autoAlpha: 1,
			left: 0,
			x: 20,
			y: 80,
			duration: 1.5,
		})
		titleTl.to('.c1-title', {
			rotate: 90,
			duration: 0.25,
			transformOrigin: 'bottom left',
		})
		titleTl.to('.c1-title', {
			autoAlpha: 0,
			y: -100,
		})

		// Line 1 animations
		const line1Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: `top top-=${line1Offset}px`,
				end: '+=1200',
				scrub: true,
			},
		})
		line1Tl.set('.c1-line1', {
			y: 100,
		})
		line1Tl.to('.c1-line1', {
			autoAlpha: 1,
			y: 0,
			duration: 4,
		})
		line1Tl.to('.c1-line1', {
			duration: 4,
			y: 0,
		})
		line1Tl.to('.c1-line1', {
			autoAlpha: 0.3,
			y: -40,
			duration: 2,
		})
		// Line 2 animations
		const line2Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: `top top-=${line2Offset}px`,
				end: '+=1600',
				scrub: true,
			},
		})
		line2Tl.set('.c1-line2', {
			y: 100,
		})
		line2Tl.to('.c1-line2', {
			autoAlpha: 1,
			y: 0,
			duration: 4,
		})
		line2Tl.to('.c1-line2', {
			autoAlpha: 0.3,
			duration: 2,
		})
		// Line 3 animations
		const line3Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: `top top-=${line3Offset}px`,
				end: '+=1200',
				scrub: true,
			},
		})
		line3Tl.set('.c1-line3', {
			y: 100,
		})
		line3Tl.to('.c1-line3', {
			autoAlpha: 1,
			y: 0,
			duration: 4,
		})
		line3Tl.to('.c1-line3', {
			autoAlpha: 0.3,
			duration: 2,
		})

		// Gpa animations
		const gpaTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top-=800px',
				end: '+=800px',
				scrub: true,
			},
		})
		gpaTl.to('.c1-gpa', { autoAlpha: 1, duration: 1 })
		gpaTl.to('.c1-bubble', {
			autoAlpha: 1,
			duration: 1,
			delay: 1,
		})
		gpaTl.to(`.${styles.happy}`, {
			autoAlpha: 0,
			duration: 0.25,
			delay: 1,
		})
		gpaTl.to(
			`.${styles.wonder}`,
			{
				autoAlpha: 1,
				duration: 0.25,
			},
			'<'
		)

		// Computer animations
		const computerTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top-=600px',
				end: '+=400px',
				scrub: true,
			},
		})
		computerTl.set('.c1-computer', {
			autoAlpha: 0,
			y: '500%',
		})
		computerTl.to('.c1-computer', {
			autoAlpha: 1,
			y: '-50%',
		})

		// Transition animations
		const transTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'bottom bottom+=600px',
				end: '+=600px',
				scrub: true,
			},
		})

		transTl.to('.c1-computer', {
			ease: 'expo.in',
			scale: 100,
			y: 650,
		})
	}, [])

	return (
		<div id='chapter1' className={cn(styles.chapter1, 'chapter1')}>
			<Background />

			<ChapterScrollContainer
				triggerClassName='c1-container'
				scrollDistance={3000}>
				<Container>
					<h1 className={cn('c1-title', styles.title)}>{title}</h1>
					<div className={cn(styles.emoji, 'c1-emoji')}>
						<div className={styles.me}>
							<FontAwesomeIcon
								icon={faFaceAwesome}
								className={styles.happy}
							/>
							<FontAwesomeIcon
								icon={faFaceThinking}
								className={styles.wonder}
							/>
						</div>
						<FontAwesomeIcon
							icon={faDesktop}
							className={cn(styles.computer, 'c1-computer')}
						/>
						<div className={styles.gpa}>
							<FontAwesomeIcon
								icon={faUserTie}
								className={cn('c1-gpa', styles.body)}
							/>
							<div className={cn('c1-bubble', styles.bubble)}>
								<FontAwesomeIcon icon={faComment} />
								<p
									className={cn(
										'c1-question',
										styles.question
									)}>
									But do you know how it works?
								</p>
							</div>
						</div>
					</div>
					<p className={cn('c1-line1', styles.line, styles.line1)}>
						{line1}
					</p>
					<p className={cn('c1-line2', styles.line, styles.line2)}>
						{line2}
					</p>
					<p className={cn('c1-line3', styles.line, styles.line3)}>
						{line3}
					</p>
				</Container>
			</ChapterScrollContainer>
		</div>
	)
}

export default Chapter1
