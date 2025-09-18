import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import { cn } from '@/utils/react'

import styles from './Chapter5.module.scss'
import { arrRotator } from '@/utils/general'

function duplicateWords(
	text: string,
	duplicates: number,
	divider?: string
): string[] {
	const words = text.split(' ')
	let arr: string[] = []
	for (let i = 0; i < duplicates; i++) {
		arr = arr.concat(words)
		if (divider) {
			arr.push(divider)
		}
	}
	return arr
}

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

/*
	Animation timeline

	Animation:
    Lines draw out from the computer connecting different devices
    Each device has an on/off button on its display as well as current status of light
    !"It's accessibility..."
    Emoji airplane moving around to different places with scroll

	Transition:

*/

const Chapter5 = () => {
	const title = 'Turning to Web Development'

	const line1 =
		'Wanting to connect my Arduino projects and control them remotely'
	const line2 = 'I turned to web development'
	const line3 = 'Its accessibility was a big draw — '
	const lineTools = 'no special tools'
	const lineComputer = 'just a computer'
	const lineInternet = 'and an internet connection.'

	const containerRef = useRef<HTMLDivElement>(null)

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
	const colorRotator = arrRotator(colors)

	useGSAP(() => {
		// Container scroll with screen
		gsap.to(containerRef.current, {
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top top',
				end: '+=4000',
				pin: true,
			},
		})

		// Title Animation
		SplitText.create(`.${styles.title}`, {
			type: 'lines',
			onSplit: ({ lines }) => {
				for (let i = 0; i < lines.length; i++) {
					const line = lines[i]
					gsap.to(line, {
						transformOrigin: 'bottom right',
						rotateY: 1080,
						y: -200,
						x: -200,
						scale: 0,
						rotate: 70,
						autoAlpha: 0,
						backgroundColor: colorRotator(),

						scrollTrigger: {
							trigger: '.chapter5',
							start: `top center-=${i * 48 - 480}px`,
							end: '+=6000px',
							scrub: true,
						},
					})
				}
			},
		})

		// Line 1,2 Animation
		const line1Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top top+=400px',
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

		// Line 3 Animation
		const line3Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top top-=200px',
				end: '+=1px',
				onUpdate: self => {
					line1Tl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		line3Tl.to(`.${styles.line3}`, {
			autoAlpha: 1,
		})

		// Line Tools,Computer,Internet Animation
		const line4Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top top-=600px',
				end: '+=1px',
				onUpdate: self => {
					line4Tl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		line4Tl.to(`.${styles.lineTools}`, { autoAlpha: 1 }, '<')
		line4Tl.to(`.${styles.lineComputer}`, {
			autoAlpha: 1,
		})
		line4Tl.to(`.${styles.lineInternet}`, {
			autoAlpha: 1,
		})
	}, [])

	return (
		<div className={cn('chapter5', styles.chapter5)}>
			<div className={styles.container} ref={containerRef}>
				<h1 className={cn('c5-title', styles.title)}>
					{duplicateWords(title, 8).map((word, i) => {
						return (
							<p key={`title-line${i}`} className={styles.word}>
								{word}
							</p>
						)
					})}
				</h1>

				<p className={cn(styles.line, styles.line1)}>{line1}</p>
				<p className={cn(styles.line, styles.line2)}>{line2}</p>
				<p className={cn(styles.line, styles.line3)}>{line3}</p>

				<p className={cn(styles.line, styles.lineTools)}>{lineTools}</p>
				<p className={cn(styles.line, styles.lineComputer)}>
					{lineComputer}
				</p>
				<p className={cn(styles.line, styles.lineInternet)}>
					{lineInternet}
				</p>
			</div>
		</div>
	)
}

export default Chapter5
