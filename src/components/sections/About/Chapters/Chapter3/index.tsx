import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './Chapter3.module.scss'
import { useRef } from 'react'
import TypeText from '@/utils/components/TypeText'
import useStateRef from 'react-usestateref'
import Conveyor from './Conveyor'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

/*
	Animation timeline

	Animation:
    Smug emoji face "walks" into view
    Packages sliding past scanner
    Scanner scans package and info is added to table as item is scanned
    Graph changes as items are added

	Transition:
    Convery belt speeds up and graph breaks out of its container
    Graph bars continue to grow off screen, bars "wrap around" to other side and wipe across screen
    Emoji face get scared/nervous as bars bury him on panel
    Bars clear revealing a woozy emoji face

*/

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

	useGSAP(() => {
		// Container scroll with screen
		gsap.to(containerRef.current, {
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top top',
				end: '+=3100',
				pin: true,
			},
		})

		// Title Animation
		const titleInTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=1px',
				onUpdate: self => {
					titleInTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		titleInTl.to(`.${styles.title}`, {
			autoAlpha: 1,
		})
		const titleOutTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top top',
				end: '+=1px',
				onUpdate: self => {
					titleOutTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		titleOutTl.to(`.${styles.title}`, {
			duration: 0.25,
			autoAlpha: 0,
		})

		// Background Animation
		const backgroundTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=1px',

				onUpdate: self => {
					backgroundTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
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
				start: `top center-=100px`,
				end: '+=3000px',
				onUpdate: self => {
					line1Tl.reversed(self.direction > 0 ? false : true)
					if (self.isActive !== showLine1State[2].current) {
						showLine1State[1](self.isActive)
					}
				},
			},
		})

		line1Tl.to(`.${styles.line1}`, {
			autoAlpha: 1,
		})
		// Line 2 Animation
		const line2Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: `top center-=100px`,
				end: '+=3000px',
				onUpdate: self => {
					line1Tl.reversed(self.direction > 0 ? false : true)
					if (self.isActive !== showLine2State[2].current) {
						showLine2State[1](self.isActive)
					}
				},
			},
		})

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
				start: `top center-=100px`,
				end: '+=3000px',
				onUpdate: self => {
					line1Tl.reversed(self.direction > 0 ? false : true)
					if (self.isActive !== showLine3State[2].current) {
						showLine3State[1](self.isActive)
					}
				},
			},
		})
		line3Tl.to(`.${styles.line3}`, {
			autoAlpha: 1,
		})
	}, [])

	return (
		<div className={cn('chapter3', styles.chapter3)}>
			<h1 ref={titleRef} className={cn('c3-title', styles.title)}>
				{title}
			</h1>
			<div ref={containerRef} className={styles.container}>
				<TypeText
					shouldAnimate={showLine3State[0]}
					text={line3}
					shouldBlink={true}
					className={cn(styles.line, styles.line3)}
					cursorClassName={styles.cursor}>
					<p>{line3}</p>
				</TypeText>

				<Conveyor />
			</div>
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
		</div>
	)
}

export default Chapter3
