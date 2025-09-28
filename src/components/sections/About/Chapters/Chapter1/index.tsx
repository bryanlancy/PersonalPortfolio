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

import styles from './Chapter1.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/*
	Animation timeline

	Animation:
	!"I've always been drawn...."
    Happy emoji appears and tech icons move by with scroll (parallax effect?)
    Emoji face moves from icon to icon as they scroll by
    Computer icon is last icon, centers on screen when in appropriate spot
	!"until my grandfather..."
    Adult slides into view
    Question speech bubble pops up from adult
	!"sparked the..."
    Curiosity? question mark

	Transition:
    Blue skidoo we can too into computer and zoom in on screen, revealing the next chapter

*/

const Chapter1 = () => {
	const title = 'How it Started'

	const line1 = "I've always been drawn to technology"
	const line2 =
		" but I didn't realize how little I understood it until my grandfather once asked how computers work."
	const line3 =
		"That question sparked the curiosity that's shaped my career ever since."

	useGSAP(() => {
		// Container scroll with screen
		gsap.to('.c1-container', {
			scrollTrigger: {
				trigger: '.c1-container',
				start: 'top top',
				end: '+=2400',
				pin: true,
			},
		})

		const emojiTl = gsap.timeline()
		// Emoji animations
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
		emojiTl.to('.c1-emoji', {
			x: -100,
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top-=600px',
				end: '+=400px',
				scrub: true,
			},
		})

		// Title animations
		const titleTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top+=400px',
				end: '+=900',
				// scrub: true,
			},
		})
		titleTl.to('.c1-title', {
			autoAlpha: 1,
			left: 0,
			x: 20,
			y: 200,
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
				start: 'top top+=0px',
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
			autoAlpha: 0,
			y: -100,
			duration: 5,
		})
		// Line 2 animations
		const line2Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top-=600px',
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
			autoAlpha: 0,
			y: -100,
			duration: 5,
		})
		// Line 3 animations
		const line3Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top-=1200px',
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
			autoAlpha: 0,
			y: -100,
			duration: 5,
		})

		// Gpa animations
		const gpaTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top-=800px',
				end: '+=400px',
				scrub: true,
			},
		})
		gpaTl.to('.c1-gpa', { autoAlpha: 1, duration: 1 })

		// Speech bubble animations
		const speechTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter1',
				start: 'top top-=1100px',
				end: '+=200px',
				scrub: true,
			},
		})
		speechTl.to('.c1-bubble', {
			autoAlpha: 1,
			duration: 1,
		})
		speechTl.to(`.${styles.happy}`, {
			autoAlpha: 0,
			duration: 0.25,
		})
		speechTl.to(`.${styles.wonder}`, {
			autoAlpha: 1,
			duration: 0.25,
		})

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
		<div id='Chapter1' className={cn(styles.chapter1, 'chapter1')}>
			<Background />
			<div className={cn('c1-container', styles.container)}>
				<h1 className={cn('c1-title', styles.title)}>{title}</h1>
				<div className={cn(styles.emoji, 'c1-emoji')}>
					<div className={styles.me}>
						<FontAwesomeIcon
							icon={faFaceAwesome}
							className={styles.happy}
							fontSize={'40px'}
						/>
						<FontAwesomeIcon
							icon={faFaceThinking}
							className={styles.wonder}
							fontSize={'40px'}
						/>
					</div>
					<FontAwesomeIcon
						icon={faDesktop}
						className={cn(styles.computer, 'c1-computer')}
						fontSize={'60px'}
					/>
					<div className={styles.gpa}>
						<FontAwesomeIcon
							icon={faUserTie}
							className={cn('c1-gpa', styles.body)}
							fontSize={'80px'}
						/>
						<div className={cn('c1-bubble', styles.bubble)}>
							<FontAwesomeIcon
								icon={faComment}
								fontSize={'160px'}
							/>
							<p className={cn('c1-question', styles.question)}>
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
			</div>
		</div>
	)
}

export default Chapter1
