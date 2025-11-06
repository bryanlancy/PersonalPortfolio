import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Project } from '@/app/data/project-list'
import { cn } from '@/utils/react'
import WaveBorder from './WaveBorder'

import styles from './Bucket.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface BucketProps {
	/** Text to display inside of the bucket. Pass an array of strings to display multiple lines */
	text: Project['description'][number]
	/** The Bucket Component comes wih default styling. Use this prop to override or add additional styling. */
	className?: string

	/** Delay, in seconds, before starting the fill animation */
	delay?: number
	/** Duration, in seconds, of fill animation */
	duration?: number
}

export default function Bucket({
	text: content,
	className,
	delay = 0,
	duration = 3,
}: BucketProps) {
	if (typeof content === 'undefined') return null
	content = typeof content === 'string' ? [content] : content

	const fillRef = useRef<HTMLDivElement>(null)
	const nibRef = useRef<HTMLDivElement>(null)
	const bucketRef = useRef<HTMLDivElement>(null)
	const [wavePaused, setWavePaused] = useState(true)

	useGSAP(() => {
		const backgroundTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.mercury`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none none reverse',

				onEnter: () => {
					backgroundTl.timeScale(1).reversed(false)
					setWavePaused(false) // Unpause wave when timeline starts
				},
				onLeaveBack: () => {
					backgroundTl.timeScale(10).reversed(true)
				},
				onLeave: () => {
					backgroundTl.timeScale(5).reversed(false)
				},
			},
			onStart: () => {
				setWavePaused(false) // Unpause wave when timeline starts playing
			},
			onComplete: () => {
				setWavePaused(true) // Pause wave when timeline completes
			},
			onReverseComplete: () => {
				setWavePaused(true) // Pause wave when timeline reverses completely
			},
		})
		// Animate all line elements, not just one
		if (bucketRef.current) {
			const lineElements = bucketRef.current.querySelectorAll(
				`.${styles.line}`
			)
			backgroundTl.to(lineElements, {
				y: 0,
				delay,
				autoAlpha: 1,
			})
		}
		backgroundTl.to(
			fillRef.current,
			{
				autoAlpha: 1,
				duration: 0.1,
			},
			'<'
		)
		backgroundTl.to(fillRef.current, {
			height: '100%',
			y: 0,
			duration,
		})
		backgroundTl.to(
			nibRef.current,
			{
				autoAlpha: 1,
				duration: 0.1,
			},
			'<+=.1'
		)
	})
	return (
		<div
			ref={bucketRef}
			className={cn(
				styles.bucket,
				className !== undefined ? styles[className] : undefined
			)}>
			{content.map((line, index) => (
				<p key={`line-${index}`} className={styles.line}>
					{line}
				</p>
			))}
			<div className={styles.background}>
				<div className={styles.fill} ref={fillRef}>
					<WaveBorder
						className={styles.top}
						paused={wavePaused}
						height={10}
						amplitude={10}
						speed={0.18}
						points={4}
					/>
				</div>
			</div>
			<div className={styles.nib} ref={nibRef}></div>
		</div>
	)
}
