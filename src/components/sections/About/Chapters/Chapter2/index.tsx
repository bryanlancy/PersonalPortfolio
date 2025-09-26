import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import useState from 'react-usestateref'
import { VT323 } from 'next/font/google'

const vt323 = VT323({
	subsets: ['latin'],
	weight: '400',
	// variable: '--font-vt',
})

import { cn } from '@/utils/react'
import TypeText from '@/utils/components/TypeText'

import styles from './Chapter2.module.scss'

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)

/*
	Animation timeline

	Animation:
	TODO Add hammer smashing pc animation for first line

    !"I started using spreadsheets..."
	Spreadsheet fades in
    Mouse icon manually clicking on each cell, typing animation adds data (typo for funsies)
    !"fascinated by how much..."
    Spreadsheet drag

	Transition:
    !"I automated nighlty math tasks..."
    Spreadsheet slides up revealing more empty rows, remains on screen during next chapter
    !"and later..."
    Under the bottom of the spreadsheet the conveyor belt used in next chapter is revealed


*/

const Chapter2 = () => {
	const title = 'Early Tech Work'
	const line1 = 'I began with building PCs and doing basic repairs.'
	const line2 =
		'In 2011, I started using spreadsheets at my first job and was fascinated by how much you could do with just formulas.'
	const line3 = 'I automated nightly math tasks'
	const line4 = 'learned some basics of data visualization'
	const line5 = 'and later'
	const line1Offset = 600
	const line2Offset = 1200
	const line3Offset = 1800
	const line4Offset = 2200
	const line5Offset = 2800
	const titleRef = useRef<HTMLHeadingElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const showTitleState = useState<boolean>(false)
	const showLine1State = useState<boolean>(false)
	const showLine2State = useState<boolean>(false)
	const showLine3State = useState<boolean>(false)
	const showLine4State = useState<boolean>(false)
	const showLine5State = useState<boolean>(false)

	useGSAP(() => {
		// Container scroll with screen
		gsap.to('.c2-container', {
			scrollTrigger: {
				trigger: '.c2-container',
				start: 'top top',
				end: '+=3100',
				pin: true,
			},
		})

		// Title Animation
		ScrollTrigger.create({
			trigger: '.chapter2',
			start: 'top top',
			onUpdate: self => {
				if (self.isActive !== showTitleState[2].current) {
					showTitleState[1](self.isActive)
				}
			},
		})

		// Line 1 Animation
		ScrollTrigger.create({
			trigger: '.chapter2',
			start: `top top-=${line1Offset}px`,
			end: '+=1200px',
			onUpdate: self => {
				if (self.isActive !== showLine1State[2].current) {
					showLine1State[1](self.isActive)
				}
			},
		})

		// Line 2 Animation
		ScrollTrigger.create({
			trigger: '.chapter2',
			start: `top top-=${line2Offset}px`,
			end: '+=1200px',
			onUpdate: self => {
				if (self.isActive !== showLine2State[2].current) {
					showLine2State[1](self.isActive)
				}
			},
		})

		// Line 3 Animation
		ScrollTrigger.create({
			trigger: '.chapter2',
			start: `top top-=${line3Offset}px`,
			end: '+=1200px',
			onUpdate: self => {
				if (self.isActive !== showLine3State[2].current) {
					showLine3State[1](self.isActive)
				}
			},
		})
		// Line 4 Animation
		ScrollTrigger.create({
			trigger: '.chapter2',
			start: `top top-=${line4Offset}px`,
			end: '+=1200px',
			onUpdate: self => {
				if (self.isActive !== showLine4State[2].current) {
					showLine4State[1](self.isActive)
				}
			},
		})

		// Line 5 Animation
		ScrollTrigger.create({
			trigger: '.chapter2',
			start: `top top-=${line5Offset}px`,

			onUpdate: self => {
				if (self.isActive !== showLine5State[2].current) {
					showLine5State[1](self.isActive)
				}
			},
		})
		gsap.to(`.${styles.line5}`, {
			y: '+=400',
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=${line5Offset + 400}px`,
				scrub: true,
			},
		})
	}, [])

	return (
		<div className={cn('chapter2', styles.chapter2, vt323.className)}>
			<div
				ref={containerRef}
				className={cn('c2-container', styles.container)}>
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
					cursorSpeedAdjust={-50}
					text={line1}
					className={cn(styles.line, styles.line1)}>
					<p>{line1}</p>
				</TypeText>
				<TypeText
					shouldAnimate={showLine2State[0]}
					text={line2}
					typeSpeed={0.015}
					cursorLengthAdjust={4}
					className={cn(styles.line, styles.line2)}>
					<p>{line2}</p>
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
			</div>
		</div>
	)
}

export default Chapter2
