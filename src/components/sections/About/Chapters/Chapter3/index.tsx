import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStateRef from 'react-usestateref'

import { cn } from '@/utils/react'
import TypeText from '@/utils/components/TypeText'
import Conveyor from './Conveyor'
import Container from '@/utils/components/Container'
import ChapterScrollContainer from '@/components/ChapterScrollContainer'

import styles from './Chapter3.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Chapter3 = () => {
	const title = 'Finding the Limits'
	const line1a =
		'added barcode-scanning functionality to a spreadsheet used to manage million'
	const line1b = ' in inventory.'
	const line2 =
		'Eventually, I hit the limits of what basic spreadsheets could do.'

	const showLine1State = useStateRef<boolean>(false)
	const showLine2State = useStateRef<boolean>(false)

	const titleRef = useRef<HTMLHeadingElement>(null)

	useGSAP(() => {
		// Title Animation
		const titleInTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=600px',
				toggleActions: 'play none resume reverse',
			},
		})
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
				start: `top top+=500px`,
				end: '+=2100px',
				toggleActions: 'play none resume reverse',
				onToggle: self => {
					if (self.isActive !== showLine1State[2].current) {
						showLine1State[1](self.isActive)
					}
				},
			},
		})

		line1Tl.to(`.${styles.line1}`, {
			autoAlpha: 1,
			duration: 0.1,
		})
		// Line 2 Animation
		const line2Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: `top top-=800px`,
				end: '+=1600px',
				toggleActions: 'play none resume reverse',
				onToggle: self => {
					if (self.isActive !== showLine2State[2].current) {
						showLine2State[1](self.isActive)
					}
				},
			},
		})
		line2Tl.to(`.${styles.line1}`, {
			autoAlpha: 0.3,
			duration: 0.25,
		})
		line2Tl.to(
			`.${styles.line2}`,
			{
				autoAlpha: 1,
				duration: 0.1,
			},
			'<'
		)

		line2Tl.to(
			`.${styles.moolah}`,
			{
				color: '#009700',
				delay: 2,
			},
			'<'
		)
	}, [])

	return (
		<div id='chapter3' className={cn('chapter3', styles.chapter3)}>
			<ChapterScrollContainer
				triggerClassName='c3-container'
				scrollDistance={2800}
				className={styles.container}>
				<Container>
					<h1 ref={titleRef} className={styles.title}>
						{title}
					</h1>

					<TypeText
						shouldAnimate={showLine1State[0]}
						text={line1a + line1b + 1}
						delay={1.1}
						className={cn(styles.line, styles.line1)}
						cursorClassName={styles.cursor}>
						<p>
							{line1a}
							<span className={styles.moolah}>$</span>
							{line1b}
						</p>
					</TypeText>
					<TypeText
						shouldAnimate={showLine2State[0]}
						text={line2}
						shouldBlink={true}
						className={cn(styles.line, styles.line2)}
						cursorClassName={styles.cursor}>
						<p>{line2}</p>
					</TypeText>
				</Container>
				<Conveyor />
			</ChapterScrollContainer>
		</div>
	)
}

export default Chapter3
