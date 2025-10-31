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
	faFaceGlasses,
	faFaceGrinHearts,
	faFaceSleeping,
	faLightbulb,
	faLightbulbOn,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'

import { cn } from '@/utils/react'
import { useScrollTriggerPause } from '@/hooks'

import styles from './Chapter4.module.scss'
import DayNight from './DayNight'
import Container from '@/utils/components/Container'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const Chapter4 = () => {
	const title = 'The Arduino Moment'
	const line1 = 'In 2015'
	const line2 = 'while trying to solve my own problem'
	const line3 = '— waking up early —'
	const line4 = `I bought an Arduino kit to build a sunrise alarm clock with LEDs.`
	const line5 = 'The first time I saw an LED respond to my code'
	const line6 = 'I was hooked.'

	const containerRef = useRef<HTMLDivElement>(null)
	const chapterRef = useRef<HTMLDivElement>(null)
	const { registerTimeline } = useScrollTriggerPause(chapterRef, '100vh')

	useGSAP(() => {
		// Container scroll with screen
		gsap.to(containerRef.current, {
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top top',
				end: '+=4750',
				pin: true,
			},
		})

		// Title Animation
		const titleTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top center',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		registerTimeline(titleTl)
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

		// Line 1,2,3 Animation
		const line1Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=600px',
				end: '+=600px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		registerTimeline(line1Tl)
		line1Tl.set(
			[`.${styles.line1}`, `.${styles.line2}`, `.${styles.line3}`],
			{ autoAlpha: 0 }
		)
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

		// Face Animation
		const faceTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top+=200px',
				end: '+=800px',
				scrub: true,
				fastScrollEnd: true,

				onUpdate: self => {
					const isScrollingDown = self.direction === -1 ? false : true
					gsap.to(`.${styles.me}`, {
						rotateY: isScrollingDown ? 180 : 0,
					})
				},
			},
		})
		registerTimeline(faceTl)
		faceTl.to(`.${styles.me}`, {
			x: 0,
		})
		const faceOnBedTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=750px',
				end: '+=400px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		registerTimeline(faceOnBedTl)

		faceOnBedTl.to(`.${styles.me}`, {
			x: 136,
			y: -45,
			ease: 'elastic',
		})
		faceOnBedTl.to(
			`.${styles.sleeping}`,
			{
				duration: 0.1,
				autoAlpha: 1,
			},
			'<'
		)
		faceOnBedTl.to(
			`.${styles.happy}`,
			{
				duration: 0.1,
				autoAlpha: 0,
			},
			'<'
		)

		// House Transition to Inside Animation
		const houseTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=600px',
				end: '+=400px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		registerTimeline(houseTransitionTl)
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

		// Face to Computer Animation
		const faceToComputerTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=2500px',
				end: '+=600px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		registerTimeline(faceToComputerTl)
		faceToComputerTl.set(`.${styles.line4}`, { autoAlpha: 0 })
		faceToComputerTl.to(`.${styles.me}`, {
			rotateY: '+=180deg',
			x: -104,
			y: 0,
		})
		faceToComputerTl.to(`.${styles.line4}`, {
			autoAlpha: 1,
		})
		faceToComputerTl.to(
			[`.${styles.line1}`, `.${styles.line2}`, `.${styles.line3}`],
			{
				autoAlpha: 0.5,
				stagger: 0.25,
			},
			'<'
		)
		faceToComputerTl.to(
			`.${styles.smart}`,
			{
				duration: 0.1,
				autoAlpha: 1,
			},
			'<'
		)
		faceToComputerTl.to(
			`.${styles.sleeping}`,
			{
				duration: 0.1,
				autoAlpha: 0,
			},
			'<'
		)

		// Line 4,5 Animation
		const line4Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=3500px',
				end: '+=400px',
				toggleActions: 'play complete none reset',
			},
		})
		registerTimeline(line4Tl)
		line4Tl.to(`.${styles.line4}`, { autoAlpha: 0.5 }, '<')
		line4Tl.to(`.${styles.line5}`, {
			autoAlpha: 1,
		})
		const lightFlickerTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top top-=3500px',
				end: '+=600px',
				toggleActions: 'play complete none reset',
				fastScrollEnd: true,
			},
		})
		registerTimeline(lightFlickerTl)

		// On
		const lightOn = (glow: boolean = false) => {
			lightFlickerTl.to(`.${styles.lightOn}`, {
				filter: glow ? 'drop-shadow(0 0 0.75rem #dcdc2b)' : undefined,
				autoAlpha: 1,
				duration: 0.1,
				delay: 0.05,
			})
			lightFlickerTl.to(
				`.${styles.lightOff}`,
				{
					autoAlpha: 0,
					duration: 0.1,
				},
				'<'
			)
		}
		// Off
		const lightOff = () => {
			lightFlickerTl.to(`.${styles.lightOn}`, {
				autoAlpha: 0,
				duration: 0.1,
			})
			lightFlickerTl.to(
				`.${styles.lightOff}`,
				{
					autoAlpha: 1,

					duration: 0.1,
				},
				'<'
			)
		}
		const flicker = () => {
			lightOn()
			lightOff()
		}

		flicker()
		flicker()
		flicker()
		flicker()
		flicker()
		lightOn(true)

		lightFlickerTl.to(
			[`.${styles.line1}`, `.${styles.line2}`, `.${styles.line3}`],
			{
				autoAlpha: 0,
				stagger: 0.25,
			},
			'<'
		)
		lightFlickerTl.to(`.${styles.line4}`, { autoAlpha: 0 }, '<')
		// Line 6 Animation
		lightFlickerTl.to(`.${styles.line6}`, {
			delay: 1,
			autoAlpha: 1,
		})
		lightFlickerTl.to(
			`.${styles.hearts}`,
			{ autoAlpha: 1, scale: 1, duration: 0.15 },
			'<'
		)
		lightFlickerTl.to(
			`.${styles.smart}`,
			{
				autoAlpha: 0,
				scale: 0,

				duration: 0.15,
			},
			'<'
		)

		// House Exit Animation
		const houseExitTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top bottom',
				end: '+=600px',
				fastScrollEnd: true,
				toggleActions: 'play complete none reverse',
			},
		})
		registerTimeline(houseExitTl)

		houseExitTl.to(
			`.${styles.houseIn}`,
			{
				autoAlpha: 0,
			},
			'<'
		)
		houseExitTl.to(
			`.${styles.bed}`,
			{
				autoAlpha: 0,
			},
			'<'
		)
		houseExitTl.to(
			`.${styles.computer}`,
			{
				autoAlpha: 0,
			},
			'<'
		)
		houseExitTl.to(
			`.${styles.me}`,
			{
				autoAlpha: 0,
			},
			'<'
		)
		houseExitTl.to(
			`.${styles.computer}`,
			{
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
			y: 80,
			scale: 1.3,
		})
	}, [])

	return (
		<div
			id='chapter4'
			ref={chapterRef}
			className={cn('chapter4', styles.chapter4)}>
			<div ref={containerRef} className={styles.container}>
				<Container>
					<h1 className={styles.title}>{title}</h1>

					<DayNight start={750} />

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
							<FontAwesomeIcon
								className={styles.sleeping}
								icon={faFaceSleeping}
							/>
							<FontAwesomeIcon
								className={styles.smart}
								icon={faFaceGlasses}
							/>
							<FontAwesomeIcon
								className={styles.hearts}
								icon={faFaceGrinHearts}
							/>
						</div>
						<FontAwesomeIcon
							icon={faBedEmpty}
							className={styles.bed}
						/>
						<FontAwesomeIcon
							icon={faComputerClassic}
							className={styles.computer}
						/>
					</div>
				</Container>
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
