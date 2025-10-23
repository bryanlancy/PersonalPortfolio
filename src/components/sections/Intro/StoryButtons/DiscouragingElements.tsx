'use client'

import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

import AnimatedElement from './AnimatedElement'
import { cn } from '@/utils/react'

import styles from './DiscouragingElements.module.scss'

gsap.registerPlugin(useGSAP, SplitText)

interface DiscouragingElementsProps {
	isVisible: boolean
	duration?: number
}

const DiscouragingElements = ({
	isVisible,
	duration = 0.6,
}: DiscouragingElementsProps) => {
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
					// rotateZ: -10,
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

	return (
		<div className={styles.discouragingContainer}>
			{/* Negative emoji elements */}
			<AnimatedElement
				x={40}
				y={-20}
				rotation={35}
				className={cn(styles.discouragingElement, styles.sad)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				😢
			</AnimatedElement>

			<AnimatedElement
				x={-100}
				y={60}
				rotation={-25}
				className={cn(styles.discouragingElement, styles.angry)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				😠
			</AnimatedElement>

			<AnimatedElement
				x={120}
				y={120}
				rotation={-15}
				className={cn(styles.discouragingElement, styles.warning)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				⚠️
			</AnimatedElement>

			<AnimatedElement
				x={-80}
				y={-100}
				rotation={30}
				className={cn(styles.discouragingElement, styles.stop)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				🛑
			</AnimatedElement>

			<AnimatedElement
				x={40}
				y={180}
				rotation={-30}
				className={cn(styles.discouragingElement, styles.no)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				❌
			</AnimatedElement>

			{/* Negative image placeholders */}
			<AnimatedElement
				x={40}
				y={60}
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
				x={-76}
				y={108}
				rotation={20}
				className={cn(styles.discouragingElement, styles.picard)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<Image
					src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTZka2NyNmNyM3h6c21wc3Z0c3VrNTVsc21neXRkMHByeTEyb2dvcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1PIGU0cftC2pG/giphy.gif'
					alt='face-palm'
					width={80}
					height={80}
				/>
			</AnimatedElement>

			<AnimatedElement
				x={160}
				y={-20}
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
				x={-240}
				y={-160}
				rotation={40}
				className={cn(styles.discouragingElement, styles.patrick)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<img
					src='/assets/patrick.gif'
					alt='Booo'
					width={120}
					height={120}
				/>
			</AnimatedElement>

			<AnimatedElement
				x={60}
				y={-130}
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
				x={120}
				y={-60}
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
