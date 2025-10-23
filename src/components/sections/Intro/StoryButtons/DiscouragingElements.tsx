'use client'

import AnimatedElement from './AnimatedElement'
import { cn } from '@/utils/react'
import styles from './DiscouragingElements.module.scss'
import Image from 'next/image'

interface DiscouragingElementsProps {
	isVisible: boolean
	duration?: number
}

const DiscouragingElements = ({
	isVisible,
	duration = 0.6,
}: DiscouragingElementsProps) => {
	return (
		<div className={styles.discouragingContainer}>
			{/* Negative emoji elements */}
			<AnimatedElement
				x={-120}
				y={-80}
				rotation={15}
				className={cn(styles.discouragingElement, styles.boo)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				👻
			</AnimatedElement>

			<AnimatedElement
				x={40}
				y={-20}
				rotation={45}
				className={cn(styles.discouragingElement, styles.sad)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				😢
			</AnimatedElement>

			<AnimatedElement
				x={-100}
				y={60}
				rotation={45}
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
				y={160}
				rotation={-30}
				className={cn(styles.discouragingElement, styles.no)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				❌
			</AnimatedElement>

			{/* Negative image placeholders */}
			<AnimatedElement
				x={-140}
				y={20}
				rotation={10}
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
				x={160}
				y={-20}
				rotation={-10}
				className={cn(
					styles.discouragingElement,

					styles.surprisedGuy
				)}
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
				x={-60}
				y={120}
				rotation={20}
				className={cn(
					styles.discouragingElement,
					styles.imagePlaceholder
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<div className={styles.placeholderContent}>
					<div className={styles.placeholderIcon}>🚫</div>
					<div className={styles.placeholderText}>No!</div>
				</div>
			</AnimatedElement>

			<AnimatedElement
				x={60}
				y={-120}
				rotation={-20}
				className={cn(
					styles.discouragingElement,
					styles.imagePlaceholder
				)}
				isVisible={isVisible}
				duration={duration}
				continuousAnimation='shake'>
				<div className={styles.placeholderContent}>
					<div className={styles.placeholderIcon}>💔</div>
					<div className={styles.placeholderText}>Sad</div>
				</div>
			</AnimatedElement>

			{/* Negative geometric shapes */}
			<AnimatedElement
				x={-40}
				y={-40}
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

			<AnimatedElement
				x={40}
				y={40}
				rotation={30}
				className={cn(
					styles.discouragingElement,
					styles.geometricShape,
					styles.arrowDown
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
