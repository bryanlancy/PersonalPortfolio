import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Wave from 'react-wavify'

import { Project } from '@/app/data/project-list'
import { cn } from '@/utils/react'

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
	const lineRef = useRef<HTMLParagraphElement>(null)

	useGSAP(() => {
		const fadeTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.mercury`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		fadeTl.to(lineRef.current, {
			y: 0,
			delay,
			autoAlpha: 1,
		})

		const backgroundTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.mercury`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		backgroundTl.to(fillRef.current, {
			autoAlpha: 1,
			delay,
			duration: 0.1,
		})
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
			className={cn(
				styles.bucket,
				className !== undefined ? styles[className] : undefined
			)}>
			{content.map(line => (
				<p key={Math.random()} className={styles.line} ref={lineRef}>
					{line}
				</p>
			))}
			<div className={styles.background}>
				<div className={styles.fill} ref={fillRef}>
					<Wave
						className={styles.top}
						paused={false}
						options={{
							height: 10,
							amplitude: 10,
							speed: 0.18,
							points: 4,
						}}
					/>
				</div>
			</div>
			<div className={styles.nib} ref={nibRef}></div>
		</div>
	)
}
