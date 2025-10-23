'use client'

import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'

import AnimatedElement from './AnimatedElement'
import { cn } from '@/utils/react'

import styles from './CelebrationElements.module.scss'
import { calculateCirclePoints } from '../MouseEffects/utils'
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

	const circlePoints = calculateCirclePoints(50, 50, 50, 100)

	const getRandomColor = () => {
		const colors = celebrationColorsRef.current
		const firstColor = colors[0]
		// Rotate the array: move first element to the end
		celebrationColorsRef.current = [...colors.slice(1), firstColor]
		return firstColor
	}

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

	return (
		<div className={styles.celebrationContainer}>
			{/* Fun shapes */}
			<AnimatedElement
				x={-120}
				y={-80}
				rotation={15}
				className={cn(styles.celebrationElement, styles.star)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				⭐
			</AnimatedElement>

			<AnimatedElement
				x={40}
				y={-8}
				rotation={40}
				className={cn(styles.celebrationElement, styles.heart)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				❤️
			</AnimatedElement>

			<AnimatedElement
				x={-100}
				y={60}
				rotation={45}
				className={cn(styles.celebrationElement, styles.sparkle)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				✨
			</AnimatedElement>

			<AnimatedElement
				x={40}
				y={64}
				rotation={90}
				className={cn(styles.celebrationElement, styles.rocket)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				🚀
			</AnimatedElement>

			<AnimatedElement
				x={-32}
				y={-40}
				rotation={30}
				className={cn(styles.celebrationElement, styles.confetti)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				🎉
			</AnimatedElement>

			<AnimatedElement
				x={0}
				y={-80}
				rotation={-30}
				className={cn(styles.celebrationElement, styles.fireworks)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				🎆
			</AnimatedElement>

			{/* Image placeholders */}
			<AnimatedElement
				x={-152}
				y={0}
				rotation={10}
				className={cn(styles.celebrationElement, styles.coolGif)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<Image
					src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3o4a3Jtc24xdjkxbnAzMzJ1YndzMTF3ZTJqN2ViYWh0dGM2MndhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SVH9y2LQUVVCRcqD7o/giphy.gif'
					alt='Very Cool'
					width={120}
					height={120}
					unoptimized
				/>
			</AnimatedElement>

			<AnimatedElement
				x={140}
				y={-20}
				rotation={-10}
				className={cn(styles.celebrationElement, styles.doItGif)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<Image
					src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzZmMnVvdjRkam40bWVobGNzdmNsdGVteW9xajNiMXJ0b2N4cnF5NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CpgNjk2E54p7W/giphy.gif'
					alt='Video'
					width={120}
					height={120}
					unoptimized
				/>
			</AnimatedElement>

			<AnimatedElement
				x={-60}
				y={120}
				rotation={20}
				className={cn(styles.celebrationElement, 'yesText')}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<h2>YES!!!</h2>
			</AnimatedElement>

			<AnimatedElement
				x={60}
				y={-120}
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
							{calculateTextRepetitions('GO!', 4.5, 30)}
						</textPath>
					</text>
				</svg>
			</AnimatedElement>

			{/* Geometric shapes */}
			<AnimatedElement
				x={20}
				y={40}
				rotation={60}
				className={cn(
					styles.celebrationElement,
					styles.geometricShape,
					styles.triangle
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<div></div>
			</AnimatedElement>

			<AnimatedElement
				x={160}
				y={64}
				rotation={0}
				className={cn(
					styles.celebrationElement,
					styles.geometricShape,
					styles.circle
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<div></div>
			</AnimatedElement>

			<AnimatedElement
				x={-80}
				y={-100}
				rotation={45}
				className={cn(
					styles.celebrationElement,
					styles.geometricShape,
					styles.square
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<div></div>
			</AnimatedElement>

			<AnimatedElement
				x={40}
				y={104}
				rotation={30}
				className={cn(
					styles.celebrationElement,
					styles.geometricShape,
					styles.diamond
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='float'>
				<div></div>
			</AnimatedElement>
		</div>
	)
}

export default CelebrationElements
