'use client'

import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

import AnimatedElement from './AnimatedElement'
import { cn } from '@/utils/react'

import styles from './DiscouragingElements.module.scss'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(useGSAP, SplitText)

interface DiscouragingElementsProps {
	isVisible: boolean
	duration?: number
}

const DiscouragingElements = ({
	isVisible,
	duration = 0.6,
}: DiscouragingElementsProps) => {
	const patrickStewartRef = useRef<HTMLVideoElement>(null)
	const patrickRef = useRef<HTMLVideoElement>(null)

	useGSAP(() => {
		const booTl = gsap.timeline()
		SplitText.create('.booText', {
			type: 'chars',
			autoSplit: true,
			onSplit: ({ chars }) => {
				booTl.to(chars, {
					color: '#ee9b00',
					y: -25,
					x: 10,
					rotateX: -40,
					fontSize: '64px',

					duration: 1,
					stagger: 0.1,
					repeat: -1,
					yoyo: true,
					ease: 'none',
				})
			},
		})
	}, [])

	useEffect(() => {
		if (isVisible) {
			patrickStewartRef.current?.play()
			patrickRef.current?.play()
		} else {
			patrickStewartRef.current?.pause()
			patrickRef.current?.pause()
		}
	}, [isVisible])

	const xFactor = 1.5
	const yFactor = 1.2

	return (
		<div className={styles.discouragingContainer}>
			{/* Negative emoji elements */}
			<AnimatedElement
				x={40 * xFactor}
				y={-20 * yFactor}
				rotation={35}
				className={cn(styles.discouragingElement, styles.sad)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				😢
			</AnimatedElement>

			<AnimatedElement
				x={-100 * xFactor}
				y={60 * yFactor}
				rotation={-25}
				className={cn(styles.discouragingElement, styles.angry)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				😠
			</AnimatedElement>

			<AnimatedElement
				x={120 * xFactor}
				y={120 * yFactor}
				rotation={-15}
				className={cn(styles.discouragingElement, styles.warning)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				⚠️
			</AnimatedElement>

			<AnimatedElement
				x={-80 * xFactor}
				y={-100 * yFactor}
				rotation={30}
				className={cn(styles.discouragingElement, styles.stop)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				🛑
			</AnimatedElement>

			<AnimatedElement
				x={40 * xFactor}
				y={180 * yFactor}
				rotation={-30}
				className={cn(styles.discouragingElement, styles.no)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				❌
			</AnimatedElement>

			{/* Negative image placeholders */}
			<AnimatedElement
				x={40 * xFactor}
				y={60 * yFactor}
				rotation={30}
				className={cn(
					styles.discouragingElement,
					styles.imagePlaceholder
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<div className={styles.placeholderContent}>
					<div className={styles.placeholderIcon}>💀</div>
					<div className={styles.placeholderText}>Don't!</div>
				</div>
			</AnimatedElement>

			<AnimatedElement
				x={-76 * xFactor}
				y={108 * yFactor}
				rotation={20}
				className={cn(styles.discouragingElement, styles.picard)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<video
					ref={patrickStewartRef}
					src='/assets/patrick-stewart.webm'
					width={80}
					height={80}
					playsInline
					webkit-playsinline='true'
					loop
					muted
				/>
			</AnimatedElement>

			<AnimatedElement
				x={160 * xFactor}
				y={-20 * yFactor}
				rotation={-10}
				className={cn(styles.discouragingElement, styles.surprisedGuy)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<Image
					src='/assets/surprised-guy.png'
					alt='Bad Idea'
					width={120}
					height={120}
				/>
			</AnimatedElement>

			<AnimatedElement
				x={-240 * xFactor}
				y={-160 * yFactor}
				rotation={40}
				className={cn(styles.discouragingElement, styles.patrick)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<video
					ref={patrickRef}
					src='/assets/patrick.webm'
					width={120}
					height={120}
					playsInline
					webkit-playsinline='true'
					loop
					muted
				/>
			</AnimatedElement>

			<AnimatedElement
				x={60 * xFactor}
				y={-130 * yFactor}
				rotation={-60}
				className={cn(
					styles.discouragingElement,
					styles.booText,
					'booText'
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<h2>BOOOOO</h2>
			</AnimatedElement>

			{/* Negative geometric shapes */}
			<AnimatedElement
				x={120 * xFactor}
				y={-60 * yFactor}
				rotation={45}
				className={cn(
					styles.discouragingElement,
					styles.geometricShape,
					styles.cross
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<div></div>
			</AnimatedElement>
		</div>
	)
}

export default DiscouragingElements
