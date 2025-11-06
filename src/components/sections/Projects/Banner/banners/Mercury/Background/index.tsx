import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'
import { usePerformanceMode } from '@/hooks/usePerformanceMode'
import Drops from './Drops'
import Container from '@/utils/components/Container'
import WaveBorder from '../WaveBorder'

import { projectList } from '@/app/data'

import styles from './Background.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Background = () => {
	const { mercury: data } = projectList
	const { mode: performanceMode } = usePerformanceMode()

	const numDrops = 3
	const [wavesPaused, setWavesPaused] = useState(true)

	// Only enable blur effect on high and medium performance devices
	const enableBlur =
		performanceMode === 'high' || performanceMode === 'medium'

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
			<div
				className={cn(
					styles.background,
					!enableBlur ? styles.noBlur : undefined
				)}>
				<WaveBorder
					className={cn(styles.wave, styles.top)}
					paused={wavesPaused}
					amplitude={10}
					speed={0.1}
					points={2}
				/>
				<Drops drops={numDrops} />
				<WaveBorder
					className={cn(styles.wave, styles.bottom)}
					paused={wavesPaused}
					height={200}
					amplitude={10}
					speed={0.18}
					points={2}
				/>
				<Container>
					<h1 className={styles.title}>{data.name}</h1>
				</Container>

				<WaveBorder
					className={cn(styles.wave, styles.bottombottom)}
					paused={wavesPaused}
					amplitude={5}
					speed={0.18}
					points={1}
				/>
			</div>
			{/* Only render expensive SVG blur filter on capable devices */}
			{enableBlur && (
				<svg style={{ position: 'absolute', width: 0, height: 0 }}>
					<defs>
						<filter id='smoosh'>
							<feGaussianBlur
								in='SourceGraphic'
								stdDeviation={10}
							/>
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
			)}
		</>
	)
}

export default Background
