import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'
import { useScrollTriggerPause } from '@/hooks'

import styles from './Chapter3.module.scss'
import { useRef } from 'react'
import TypeText from '@/utils/components/TypeText'
import useStateRef from 'react-usestateref'
import Conveyor from './Conveyor'
import Container from '@/utils/components/Container'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Chapter3 = () => {
	const title = 'Finding the Limits'
	const line1 = 'added barcode-scanning functionality to a spreadsheet'
	const line2a = 'used to manage million'
	const line2b = ' in inventory.'
	const line3 =
		'Eventually, I hit the limits of what basic spreadsheets could do.'

	const showLine1State = useStateRef<boolean>(false)
	const showLine2State = useStateRef<boolean>(false)
	const showLine3State = useStateRef<boolean>(false)

	const titleRef = useRef<HTMLHeadingElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const chapterRef = useRef<HTMLDivElement>(null)
	const { registerTimeline } = useScrollTriggerPause(chapterRef, '100vh')

	useGSAP(() => {
		// Container scroll with screen
		gsap.to(containerRef.current, {
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top top',
				end: '+=2800',
				pin: true,
			},
		})

		// Title Animation
		const titleInTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=600px',
				toggleActions: 'play none resume reverse',
			},
		})
		registerTimeline(titleInTl)
		titleInTl.to(`.${styles.title}`, {
			duration: 0.25,
			autoAlpha: 1,
		})

		// Background Animation
		const backgroundTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=1000px',
				toggleActions: 'play pause resume reverse',
				fastScrollEnd: true,
			},
		})
		registerTimeline(backgroundTl)
		backgroundTl.to(['.chapter2', '.chapter3'], {
			backgroundColor: '#000',
		})
		backgroundTl.to(
			[`.${styles.line1}`, `.${styles.line2}`],
			{
				duration: 0.1,
				autoAlpha: 1,
			},
			'<'
		)

		// Line 1 Animation
		const line1Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: `top top`,
				end: '+=1800px',
				toggleActions: 'play none resume reverse',
				onToggle: self => {
					if (self.isActive !== showLine1State[2].current) {
						showLine1State[1](self.isActive)
					}
				},
			},
		})
		registerTimeline(line1Tl)

		line1Tl.to(`.${styles.line1}`, {
			autoAlpha: 1,
		})
		// Line 2 Animation
		const line2Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: `top top+=200px`,
				end: '+=1800px',
				toggleActions: 'play none resume reverse',
				onToggle: self => {
					if (self.isActive !== showLine2State[2].current) {
						showLine2State[1](self.isActive)
					}
				},
			},
		})
		registerTimeline(line2Tl)

		line2Tl.to(`.${styles.line2}`, {
			autoAlpha: 1,
		})
		line2Tl.to(
			`.${styles.moolah}`,
			{
				color: '#009700',
				delay: 2,
			},
			'<'
		)
		// Line 3 Animation
		const line3Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: `top top-=600px`,
				end: '+=1000px',
				toggleActions: 'play none resume reverse',
				onToggle: self => {
					if (self.isActive !== showLine3State[2].current) {
						showLine3State[1](self.isActive)
					}
				},
			},
		})
		registerTimeline(line3Tl)
		line3Tl.to([`.${styles.line1}`, `.${styles.line2}`], {
			duration: 0.75,
			autoAlpha: 0.5,
		})
		line3Tl.to(`.${styles.line3}`, {
			autoAlpha: 1,
		})
	}, [])

	return (
		<div
			id='chapter3'
			ref={chapterRef}
			className={cn('chapter3', styles.chapter3)}>
			<div ref={containerRef} className={styles.container}>
				<Container>
					<h1 ref={titleRef} className={styles.title}>
						{title}
					</h1>

					<TypeText
						shouldAnimate={showLine3State[0]}
						text={line3}
						shouldBlink={true}
						className={cn(styles.line, styles.line3)}
						cursorClassName={styles.cursor}>
						<p>{line3}</p>
					</TypeText>

					<TypeText
						shouldAnimate={showLine1State[0]}
						text={line1}
						typeSpeed={0.02}
						className={cn(styles.line, styles.line1)}
						cursorClassName={styles.cursor}>
						<p>{line1}</p>
					</TypeText>
					<TypeText
						shouldAnimate={showLine2State[0]}
						text={line2a + line2b + 1}
						delay={1.1}
						className={cn(styles.line, styles.line2)}
						cursorClassName={styles.cursor}>
						<p>
							{line2a}
							<span className={styles.moolah}>$</span>
							{line2b}
						</p>
					</TypeText>
				</Container>
				<Conveyor />
			</div>
		</div>
	)
}

export default Chapter3
