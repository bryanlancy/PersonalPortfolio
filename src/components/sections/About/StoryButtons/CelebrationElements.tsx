'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'

import AnimatedElement from './AnimatedElement'
import { cn } from '@/utils/react'

import styles from './CelebrationElements.module.scss'

import { generateCircularPath } from '@/utils/svg'
import { calculateTextRepetitions } from '@/utils/general'

gsap.registerPlugin(useGSAP, SplitText)

interface CelebrationElementsProps {
	isVisible: boolean
	duration?: number
}
const CelebrationElements = ({
	isVisible,
	duration = 0.6,
}: CelebrationElementsProps) => {
	const celebrationColorsRef = useRef([
		'#ff6b6b', // Red
		'#4ecdc4', // Teal
		'#45b7d1', // Blue
		'#96ceb4', // Green
		'#feca57', // Yellow
		'#ff9ff3', // Pink
		'#54a0ff', // Light Blue
		'#5f27cd', // Purple
		'#00d2d3', // Cyan
		'#ff9f43', // Orange
		'#ff6348', // Coral
		'#2ed573', // Lime Green
	])
	const veryCoolRef = useRef<HTMLVideoElement>(null)
	const doItRef = useRef<HTMLVideoElement>(null)

	useGSAP(() => {
		const yesSplitTl = gsap.timeline({})
		SplitText.create(`.yesText > h2`, {
			type: 'chars',
			autoSplit: true,
			onSplit: self => {
				yesSplitTl.to(self.chars, {
					y: 24,
					duration: 0.5,
					color: i => celebrationColorsRef.current[i],
					yoyo: true,
					repeat: -1,
					stagger: 0.025,
				})
			},
		})

		const goTl = gsap.timeline()
		goTl.to(`.${styles.goGoGo} svg`, {
			rotateZ: '+=360',
			duration: 10,
			repeat: -1,
			ease: 'none',
			transformOrigin: '50% 50%',
		})
	}, [])

	const xFactor = 1.5
	const yFactor = 1.2

	useEffect(() => {
		if (isVisible) {
			veryCoolRef.current?.play()
			doItRef.current?.play()
		} else {
			veryCoolRef.current?.pause()
			doItRef.current?.pause()
		}
	}, [isVisible])

	return (
		<div className={styles.celebrationContainer}>
			{/* Fun shapes */}
			<AnimatedElement
				x={-120 * xFactor}
				y={-80 * yFactor}
				rotation={15}
				className={cn(styles.celebrationElement, styles.star)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				⭐
			</AnimatedElement>

			<AnimatedElement
				x={40 * xFactor}
				y={-8 * yFactor}
				rotation={40}
				className={cn(styles.celebrationElement, styles.heart)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				❤️
			</AnimatedElement>

			<AnimatedElement
				x={-100 * xFactor}
				y={60 * yFactor}
				rotation={45}
				className={cn(styles.celebrationElement, styles.sparkle)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				✨
			</AnimatedElement>

			<AnimatedElement
				x={40 * xFactor}
				y={64 * yFactor}
				rotation={90}
				className={cn(styles.celebrationElement, styles.rocket)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				🚀
			</AnimatedElement>

			<AnimatedElement
				x={-32 * xFactor}
				y={-40 * yFactor}
				rotation={30}
				className={cn(styles.celebrationElement, styles.confetti)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				🎉
			</AnimatedElement>

			<AnimatedElement
				x={0 * xFactor}
				y={-80 * yFactor}
				rotation={-30}
				className={cn(styles.celebrationElement, styles.fireworks)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				🎆
			</AnimatedElement>

			{/* Image placeholders */}
			<AnimatedElement
				x={-152 * xFactor}
				y={0 * yFactor}
				rotation={10}
				className={cn(styles.celebrationElement, styles.coolGif)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<video
					ref={veryCoolRef}
					src='/assets/very-cool.webm'
					width={152}
					height={120}
					playsInline
					webkit-playsinline='true'
					loop
					muted
				/>
			</AnimatedElement>

			<AnimatedElement
				x={140 * xFactor}
				y={-20 * yFactor}
				rotation={-10}
				className={cn(styles.celebrationElement, styles.doItGif)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<video
					ref={doItRef}
					src='/assets/do-it.webm'
					width={120}
					height={120}
					playsInline
					webkit-playsinline='true'
					loop
					muted
				/>
			</AnimatedElement>

			<AnimatedElement
				x={-60 * xFactor}
				y={120 * yFactor}
				rotation={20}
				className={cn(styles.celebrationElement, 'yesText')}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<h2>YES!!!</h2>
			</AnimatedElement>

			<AnimatedElement
				x={60 * xFactor}
				y={-120 * yFactor}
				rotation={-20}
				className={cn(styles.celebrationElement, styles.goGoGo)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<svg width={100} height={100} viewBox='0 0 100 100'>
					<defs>
						<path
							id='goPath'
							d={generateCircularPath(50, 50, 30)}></path>
					</defs>

					<text>
						<textPath
							href='#goPath'
							textAnchor='start'
							startOffset='0%'>
							{calculateTextRepetitions('GO!', 4.5, 30, true)}
						</textPath>
					</text>
				</svg>
			</AnimatedElement>

			{/* Geometric shapes */}
			<AnimatedElement
				x={20 * xFactor}
				y={40 * yFactor}
				rotation={60}
				className={cn(
					styles.celebrationElement,
					styles.geometricShape,
					styles.triangle
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				{/* Leave empty, the shape is generated in the CSS */}
				<div></div>
			</AnimatedElement>

			<AnimatedElement
				x={160 * xFactor}
				y={64 * yFactor}
				rotation={0}
				className={cn(
					styles.celebrationElement,
					styles.geometricShape,
					styles.circle
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				{/* Leave empty, the shape is generated in the CSS */}
				<div></div>
			</AnimatedElement>

			<AnimatedElement
				x={-80 * xFactor}
				y={-100 * yFactor}
				rotation={45}
				className={cn(
					styles.celebrationElement,
					styles.geometricShape,
					styles.square
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				{/* Leave empty, the shape is generated in the CSS */}
				<div></div>
			</AnimatedElement>

			<AnimatedElement
				x={40 * xFactor}
				y={104 * yFactor}
				rotation={30}
				className={cn(
					styles.celebrationElement,
					styles.geometricShape,
					styles.diamond
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				{/* Leave empty, the shape is generated in the CSS */}
				<div></div>
			</AnimatedElement>
		</div>
	)
}

export default CelebrationElements
