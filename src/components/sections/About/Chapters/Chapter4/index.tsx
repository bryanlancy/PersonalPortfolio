import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faHouseChimneyBlank,
	faHouseChimney,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp/thin'
import {
	faBedEmpty,
	faComputerClassic,
	faFaceAwesome,
	faLightbulb,
	faLightbulbOn,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'

import { cn } from '@/utils/react'

import styles from './Chapter4.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/*
	Animation timeline

	Animation:
    Woozy emoji face starts rolling across the screen
    !"In 2015, while trying..."
    A basic "ground" appears to add to movement animation
    House comes into view and emoji goes inside and sleeps (animated z's floating above?)
    !"waking up early..."
    Rotate sun and moon overhead, indicating sleeping for days
    On final night cycle, house rotates with scene, revealing new scene and text
    !"I bought an Arduino..."
    Curious emoji with small circuit and light
    Hook1 text starts fading in and light icon flickers on, face turns to happy
    Hook2 text appears, face and hook1 fade out, followed shortly by hook2

	Transition:
    Light icon remains on screen, and scales down (zoom out effect)
    Zoom out of computer screen from earlier animation to emoji face sitting at computer
*/

const Chapter4 = () => {
	const title = 'The Arduino Moment'
	const line1 = 'In 2015'
	const line2 = 'while trying to solve my own problem'
	const line3 = '— waking up early —'
	const line4 = `I bought an Arduino kit to build a sunrise alarm clock with LEDs.`
	const line5 = 'The first time I saw an LED respond to my code'
	const line6 = 'I was hooked.'

	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		// Container scroll with screen
		gsap.to(containerRef.current, {
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top top',
				end: '+=5000',
				pin: true,
			},
		})

		// Title Animation
		const titleTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top center',
				end: '+=1px',
				onUpdate: self => {
					titleTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		const splitText = SplitText.create(`.${styles.title}`, {
			type: 'lines',
			mask: 'lines',
			onSplit: text => {
				gsap.to(text.lines, { y: -50 })
			},
		})

		titleTl.to(splitText.lines, {
			duration: 1,
			ease: 'bounce.out',
			y: 0,
			stagger: 0.5,
		})

		// Face Animation
		const faceTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top+=200px',
				end: '+=800px',
				scrub: true,
				onUpdate: self => {
					const isScrollingDown = self.direction === -1 ? false : true
					if (isScrollingDown) {
						gsap.to(`.${styles.me}`, {
							rotateY: 180,
						})
					} else {
						gsap.to(`.${styles.me}`, {
							rotateY: 0,
						})
					}
				},
			},
		})
		faceTl.to(`.${styles.me}`, {
			x: 0,
		})
		const faceOnBedTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=750px',
				end: '+=1px',
				onUpdate: self => {
					faceOnBedTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		faceOnBedTl.to(`.${styles.me}`, {
			x: 60,
			y: -90,
		})
		faceOnBedTl.to(`.${styles.me}`, {
			x: 120,
			y: -45,
		})

		//! Change to sleeping emoji

		const faceToComputerTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=2500px',
				end: '+=1px',
				onUpdate: self => {
					faceToComputerTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		faceToComputerTl.to(`.${styles.me}`, {
			rotateY: '+=180deg',
			x: -136,
			y: 0,
		})
		faceToComputerTl.to(`.${styles.line4}`, {
			autoAlpha: 1,
		})
		faceToComputerTl.to(
			[`.${styles.line1}`, `.${styles.line2}`, `.${styles.line3}`],
			{
				autoAlpha: 0,
				stagger: 0.25,
			},
			'<'
		)

		//! Change to glasses emoji

		// House Transition to Inside Animation
		const houseTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=600px',
				end: '+=1px',
				onUpdate: self => {
					houseTransitionTl.reversed(
						self.direction > 0 ? false : true
					)
				},
			},
		})
		houseTransitionTl.to(`.${styles.houseOut}`, {
			autoAlpha: 0,
		})
		houseTransitionTl.to(
			`.${styles.houseIn}`,
			{
				duration: 0.1,
				autoAlpha: 1,
			},
			'<'
		)
		houseTransitionTl.to(
			`.${styles.bed}`,
			{
				duration: 0.25,
				autoAlpha: 1,
			},
			'<'
		)
		houseTransitionTl.to(
			`.${styles.computer}`,
			{
				duration: 0.25,
				delay: 0.25,
				autoAlpha: 1,
			},
			'<'
		)
		houseTransitionTl.to(
			`.${styles.lightContainer}`,
			{
				duration: 0.25,
				autoAlpha: 1,
			},
			'<'
		)
		houseTransitionTl.to(
			`.${styles.computer}`,
			{
				duration: 0.25,
				autoAlpha: 1,
			},
			'<'
		)

		// House Exit Animation
		const houseExitTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top bottom',
				end: '+=1px',
				onUpdate: self => {
					houseExitTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})

		houseExitTl.to(
			`.${styles.houseIn}`,
			{
				// duration: 0.1,
				autoAlpha: 0,
			},
			'<'
		)
		houseExitTl.to(
			`.${styles.bed}`,
			{
				// duration: 0.25,
				autoAlpha: 0,
			},
			'<'
		)
		houseExitTl.to(
			`.${styles.computer}`,
			{
				// duration: 0.25,
				autoAlpha: 0,
			},
			'<'
		)
		houseExitTl.to(
			`.${styles.me}`,
			{
				// duration: 0.25,
				autoAlpha: 0,
			},
			'<'
		)
		houseExitTl.to(
			`.${styles.computer}`,
			{
				// duration: 0.25,
				autoAlpha: 0,
			},
			'<'
		)

		houseExitTl.to(
			`.${styles.line5}`,
			{ autoAlpha: 0, duration: 0.25 },
			'<'
		)
		houseExitTl.to(
			`.${styles.line6}`,
			{ autoAlpha: 0, duration: 0.25 },
			'<'
		)
		houseExitTl.to(`.${styles.lightContainer}`, {
			scale: 1.3,
		})

		// Line 1,2,3 Animation
		const line1Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=600px',
				end: '+=1px',
				onUpdate: self => {
					line1Tl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		line1Tl.to(`.${styles.line1}`, {
			autoAlpha: 1,
		})
		line1Tl.to(`.${styles.line2}`, {
			autoAlpha: 1,
		})
		line1Tl.to(`.${styles.line3}`, {
			delay: 1,
			autoAlpha: 1,
		})

		// Line 4,5 Animation
		const line4Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=3500px',
				end: '+=1px',
				onUpdate: self => {
					line4Tl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		line4Tl.to(`.${styles.line4}`, { autoAlpha: 0 }, '<')
		line4Tl.to(`.${styles.line5}`, {
			autoAlpha: 1,
		})

		// Line 6 Animation
		const line6Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=4500px',
				end: '+=1px',
				onUpdate: self => {
					line6Tl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		line6Tl.to(`.${styles.line6}`, {
			delay: 1,
			autoAlpha: 1,
		})
	}, [])

	return (
		<div className={cn('chapter4', styles.chapter4)}>
			<div ref={containerRef} className={styles.container}>
				<h1 className={styles.title}>{title}</h1>

				<p className={cn(styles.line, styles.line1)}>{line1}</p>
				<p className={cn(styles.line, styles.line2)}>{line2}</p>
				<i className={cn(styles.line, styles.line3)}>{line3}</i>
				<p className={cn(styles.line, styles.line4)}>{line4}</p>
				<p className={cn(styles.line, styles.line5)}>{line5}</p>
				<p className={cn(styles.line, styles.line6)}>{line6}</p>

				<div className={styles.house}>
					<div className={styles.houseContainer}>
						<FontAwesomeIcon
							icon={faHouseChimney}
							className={styles.houseOut}
						/>
						<FontAwesomeIcon
							icon={faHouseChimneyBlank}
							className={styles.houseIn}
						/>
					</div>
					<div className={styles.me}>
						<FontAwesomeIcon
							className={styles.happy}
							icon={faFaceAwesome}
						/>
					</div>
					<FontAwesomeIcon icon={faBedEmpty} className={styles.bed} />
					<FontAwesomeIcon
						icon={faComputerClassic}
						className={styles.computer}
					/>
				</div>
			</div>
			<div className={cn('lightContainer', styles.lightContainer)}>
				<FontAwesomeIcon
					icon={faLightbulb}
					className={styles.lightOff}
				/>
				<FontAwesomeIcon
					icon={faLightbulbOn}
					className={styles.lightOn}
				/>
			</div>
		</div>
	)
}

export default Chapter4
