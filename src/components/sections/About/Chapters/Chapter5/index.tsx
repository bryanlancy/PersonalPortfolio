import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faLaptop,
	faScrewdriverWrench,
	faWifiFair,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import {
	faBan,
	faCheck,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import { arrRotator } from '@/utils/general'
import { cn } from '@/utils/react'

import styles from './Chapter5.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

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
	const line3 = 'Its accessibility was a big draw'
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
				gsap.to(`.${styles.title}`, {
					rotate: 30,
					scrollTrigger: {
						trigger: '.chapter5',
						start: 'top center-=960px',
						end: '+=6000px',
						scrub: true,
					},
				})
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

		// Line 3,Tools,Computer,Internet Animation
		const line3Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top top-=200px',
				end: '+=1px',
				onUpdate: self => {
					line3Tl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		line3Tl.to(`.${styles.line3}`, {
			autoAlpha: 1,
		})
		line3Tl.to(
			[
				`.${styles.toolsContainer} p`,
				`.${styles.toolsContainer}>.${styles.iconContainer}`,
				`.${styles.toolsContainer} .${styles.check}`,
			],
			{
				delay: 0.5,
				stagger: 0.3,
				autoAlpha: 1,
			}
		)
		line3Tl.to(
			[
				`.${styles.computerContainer} p`,
				`.${styles.computerContainer}>.${styles.iconContainer}`,
				`.${styles.computerContainer} .${styles.check}`,
			],
			{
				delay: 0.5,
				stagger: 0.3,
				autoAlpha: 1,
			}
		)
		line3Tl.to(
			[
				`.${styles.internetContainer} p`,
				`.${styles.internetContainer}>.${styles.iconContainer}`,
				`.${styles.internetContainer} .${styles.check}`,
			],
			{
				delay: 0.5,
				stagger: 0.3,
				autoAlpha: 1,
			}
		)
	}, [])

	return (
		<div id='Chapter5' className={cn('chapter5', styles.chapter5)}>
			<div className={styles.container} ref={containerRef}>
				<div className={styles.networkContainer}>Network Animation</div>
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

				<div className={cn(styles.proContainer, styles.toolsContainer)}>
					<div className={styles.iconContainer}>
						<FontAwesomeIcon icon={faBan} className={styles.ban} />
						<FontAwesomeIcon
							icon={faScrewdriverWrench}
							className={styles.icon}
						/>
					</div>
					<div className={styles.text}>
						<FontAwesomeIcon
							icon={faCheck}
							className={styles.check}
						/>
						<p className={styles.lineTools}>{lineTools}</p>
					</div>
				</div>
				<div
					className={cn(
						styles.proContainer,
						styles.computerContainer
					)}>
					<div className={styles.iconContainer}>
						<FontAwesomeIcon
							icon={faLaptop}
							className={styles.icon}
						/>
					</div>
					<div className={styles.text}>
						<FontAwesomeIcon
							icon={faCheck}
							className={styles.check}
						/>
						<p className={styles.lineComputer}>{lineComputer}</p>
					</div>
				</div>

				<div
					className={cn(
						styles.proContainer,
						styles.internetContainer
					)}>
					<div className={styles.iconContainer}>
						<FontAwesomeIcon
							icon={faWifiFair}
							className={styles.icon}
						/>
					</div>
					<div className={styles.text}>
						<FontAwesomeIcon
							icon={faCheck}
							className={styles.check}
						/>
						<p className={styles.lineInternet}>{lineInternet}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chapter5
