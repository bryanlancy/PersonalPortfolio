import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Wave from 'react-wavify'

import { cn } from '@/utils/react'
import Drops from './Drops'
import Container from '@/utils/components/Container'

import { projectList } from '@/app/data'

import styles from './Background.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Background = () => {
	const { mercury: data } = projectList

	const numDrops = 3
	const [wavesPaused, setWavesPaused] = useState(true)

	useGSAP(() => {
		const backgroundTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.mercury`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		backgroundTl.to(`.${styles.top}`, {
			y: 0,
			autoAlpha: 1,
		})

		const backgroundBottomTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.mercury`,
				start: 'top center+=200px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		backgroundBottomTl.to(`.${styles.bottom}`, {
			y: 0,
			autoAlpha: 1,
		})

		// Pause/unpause waves based on visibility
		ScrollTrigger.create({
			trigger: `.mercury`,
			start: 'top bottom',
			end: 'bottom top',
			onEnter: () => setWavesPaused(false),
			onLeave: () => setWavesPaused(true),
			onEnterBack: () => setWavesPaused(false),
			onLeaveBack: () => setWavesPaused(true),
		})
	})

	return (
		<>
			<div className={styles.background}>
				<Wave
					className={cn(styles.wave, styles.top)}
					paused={wavesPaused}
					options={{
						height: 10,
						amplitude: 15,
						speed: 0.15,
						points: 3,
					}}
				/>
				<Drops drops={numDrops} />
				<Wave
					className={cn(styles.wave, styles.bottom)}
					paused={wavesPaused}
					options={{
						height: 10,
						amplitude: 25,
						speed: 0.18,
						points: 4,
					}}
				/>
				<Container>
					<h1 className={styles.title}>{data.name}</h1>
				</Container>

				<Wave
					className={cn(styles.wave, styles.bottombottom)}
					paused={wavesPaused}
					options={{
						height: 8,
						amplitude: 15,
						speed: 0.18,
						points: 4,
					}}
				/>
			</div>
			<svg>
				<defs>
					<filter id='smoosh'>
						<feGaussianBlur in='SourceGraphic' stdDeviation={10} />
						<feColorMatrix
							in='name'
							mode='matrix'
							values='1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 30 -15'
						/>
						<feBlend in='SourceGraphic' />
					</filter>
				</defs>
			</svg>
		</>
	)
}

export default Background
