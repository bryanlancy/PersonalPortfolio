import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import useState from 'react-usestateref'
import { VT323 } from 'next/font/google'

import Container from '@/utils/components/Container'
import { cn } from '@/utils/react'
import TypeText from '@/utils/components/TypeText'
import { useScrollTriggerPause } from '@/hooks'

import styles from './Chapter2.module.scss'

const vt323 = VT323({
	subsets: ['latin'],
	weight: '400',
})
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)

const Chapter2 = () => {
	const title = 'Early Tech Work'
	const line1 = 'I began with building PCs and doing basic repairs.'
	const line2a = 'In 2011, I started using spreadsheets at my first job and'
	const line2b = 'was fascinated by how much you could do with just formulas.'
	const line3 = 'I automated nightly math tasks'
	const line4 = 'learned some basics of data visualization'
	const line5 = 'and later'
	const containerScrollLength = 2800
	const line1Offset = 600
	const line2Offset = 1200
	const line3Offset = 1800
	const line4Offset = 2200
	const line5Offset = 2400
	const titleRef = useRef<HTMLHeadingElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const showTitleState = useState<boolean>(false)
	const showLine1State = useState<boolean>(false)
	const showLine2State = useState<boolean>(false)
	const showLine3State = useState<boolean>(false)
	const showLine4State = useState<boolean>(false)
	const showLine5State = useState<boolean>(false)

	const chapterRef = useRef<HTMLDivElement>(null)
	const { registerTimeline } = useScrollTriggerPause(chapterRef, '100vh')

	useGSAP(() => {
		// Container scroll with screen
		gsap.to('.c2-container', {
			scrollTrigger: {
				trigger: '.c2-container',
				start: 'top top',
				end: `+=${containerScrollLength}px`,
				pin: true,
			},
		})

		// Title Animation
		ScrollTrigger.create({
			trigger: '.chapter2',
			start: 'top top',
			onToggle: self => {
				if (self.isActive !== showTitleState[2].current) {
					showTitleState[1](self.isActive)
				}
			},
		})

		// Line 1 Animation
		const line1Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=${line1Offset}px`,
				end: `+=${containerScrollLength - line1Offset + 400}px`,
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
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
			duration: 0.5,
		})

		// Line 2 Animation
		const line2Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=${line2Offset}px`,
				end: `+=${containerScrollLength - line2Offset + 400}px`,
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
				onToggle: self => {
					if (self.isActive !== showLine2State[2].current) {
						showLine2State[1](self.isActive)
					}
				},
			},
		})
		registerTimeline(line2Tl)
		line2Tl.to([`.${styles.line2a}`, `.${styles.line2b}`], {
			autoAlpha: 1,
			duration: 0.5,
		})
		line2Tl.to(`.${styles.line1}`, {
			autoAlpha: 0.5,
		})

		// Line 3 Animation
		const line3Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=${line3Offset}px`,
				end: `+=${containerScrollLength - line3Offset + 400}px`,
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
				onToggle: self => {
					if (self.isActive !== showLine3State[2].current) {
						showLine3State[1](self.isActive)
					}
				},
			},
		})
		registerTimeline(line3Tl)
		line3Tl.to(`.${styles.line3}`, {
			autoAlpha: 1,
			duration: 0.5,
		})
		line3Tl.to([`.${styles.line2a}`, `.${styles.line2b}`], {
			autoAlpha: 0.5,
		})

		// Line 4 Animation
		const line4Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=${line4Offset}px`,
				end: `+=${containerScrollLength - line4Offset + 400}px`,
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
				onToggle: self => {
					if (self.isActive !== showLine4State[2].current) {
						showLine4State[1](self.isActive)
					}
				},
			},
		})
		registerTimeline(line4Tl)
		line4Tl.to(`.${styles.line4}`, {
			autoAlpha: 1,
			duration: 0.5,
		})
		line4Tl.to(`.${styles.line3}`, {
			autoAlpha: 0.5,
		})

		// Line 5 Animation
		const line5Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=${line5Offset + 400}px`,
				end: `+=${containerScrollLength - line5Offset + 400}px`,
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
				onToggle: self => {
					if (self.isActive !== showLine5State[2].current) {
						showLine5State[1](self.isActive)
					}
				},
			},
		})
		registerTimeline(line5Tl)
		line5Tl.to(`.${styles.line5}`, {
			autoAlpha: 1,
			duration: 0.5,
		})
		line5Tl.to(`.${styles.line4}`, {
			autoAlpha: 0.5,
		})

		// Line 5 Transition Animation
		const line5TransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=${line5Offset + 400}px`,
				scrub: true,
				fastScrollEnd: true,
			},
		})
		registerTimeline(line5TransitionTl)
		line5TransitionTl.to(`.${styles.line5}`, {
			y: '+=400',
		})
	}, [])

	return (
		<div
			id='chapter2'
			ref={chapterRef}
			className={cn('chapter2', styles.chapter2, vt323.className)}>
			<div
				ref={containerRef}
				className={cn('c2-container', styles.container)}>
				<Container>
					<TypeText
						shouldAnimate={showTitleState[0]}
						text={title}
						shouldBlink={true}
						typeSpeed={0.075}
						className={styles.titleContainer}>
						<h1 ref={titleRef}>{title}</h1>
					</TypeText>
					<TypeText
						shouldAnimate={showLine1State[0]}
						text={line1}
						className={cn(styles.line, styles.line1)}>
						<p>{line1}</p>
					</TypeText>

					<TypeText
						shouldAnimate={showLine2State[0]}
						text={line2a}
						typeSpeed={0.015}
						cursorLengthAdjust={4}
						className={cn(styles.line, styles.line2a)}>
						<p>{line2a}</p>
					</TypeText>
					<TypeText
						shouldAnimate={showLine2State[0]}
						text={line2b}
						typeSpeed={0.015}
						cursorLengthAdjust={4}
						delay={1.5}
						className={cn(styles.line, styles.line2b)}>
						<p>{line2b}</p>
					</TypeText>
					<TypeText
						shouldAnimate={showLine3State[0]}
						text={line3}
						cursorLengthAdjust={8}
						className={cn(styles.line, styles.line3)}>
						<p>{line3}</p>
					</TypeText>
					<TypeText
						shouldAnimate={showLine4State[0]}
						text={line4}
						cursorLengthAdjust={4}
						className={cn(styles.line, styles.line4)}>
						<p>{line4}</p>
					</TypeText>
					<TypeText
						shouldAnimate={showLine5State[0]}
						text={line5}
						cursorLengthAdjust={4}
						className={cn(styles.line, styles.line5)}>
						<p>{line5}</p>
					</TypeText>
				</Container>
			</div>
		</div>
	)
}

export default Chapter2
