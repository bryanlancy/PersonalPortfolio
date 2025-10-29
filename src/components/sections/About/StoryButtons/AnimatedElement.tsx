'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/utils/react'
import styles from './AnimatedElement.module.scss'

interface AnimatedElementProps {
	children: React.ReactNode
	x: number
	y: number
	rotation: number
	isVisible: boolean
	duration?: number
	className?: string
	continuousAnimation?: 'float' | 'shake' | 'none'
	continuousDuration?: number
}

const AnimatedElement = ({
	children,
	x,
	y,
	rotation,
	isVisible,
	duration = 0.6,
	className = '',
	continuousAnimation = 'none',
	continuousDuration = 0.5,
}: AnimatedElementProps) => {
	const elementRef = useRef<HTMLDivElement>(null)
	const timelineRef = useRef<gsap.core.Timeline | null>(null)

	// Cleanup timeline on unmount
	useEffect(() => {
		return () => {
			if (timelineRef.current) {
				timelineRef.current.kill()
			}
		}
	}, [])

	useGSAP(
		() => {
			// Create timeline once and store reference
			timelineRef.current = gsap.timeline()

			timelineRef.current.fromTo(
				elementRef.current,
				{
					autoAlpha: 0,
					scale: 0,
					x: 0,
					y: 0,
					rotation: 0,
				},
				{
					autoAlpha: 1,
					scale: 1,
					x: x,
					y: y,
					rotation: rotation,
					duration: duration,
					ease: 'back.out(1.7)',
				}
			)

			// Add continuous animation based on type
			if (continuousAnimation === 'float') {
				timelineRef.current.to(
					elementRef.current,
					{
						y: `+=${Math.random() * 20 - 10}`,
						duration: continuousDuration,
						ease: 'sine.inOut',
						repeat: 10,
						yoyo: true,
					},
					'-=0.3'
				)
			} else if (continuousAnimation === 'shake') {
				timelineRef.current.to(
					elementRef.current,
					{
						x: `+=${Math.random() * 10 - 5}`,
						y: `+=${Math.random() * 6 - 3}`,
						duration: continuousDuration,
						ease: 'power2.inOut',
						repeat: 10,
						yoyo: true,
					},
					'-=0.3'
				)
			}
		},
		{ scope: elementRef }
	)

	// Handle visibility changes
	useGSAP(
		() => {
			if (timelineRef.current) {
				if (isVisible) {
					// Play timeline forward
					timelineRef.current.timeScale(1).reversed(false)
				} else {
					// Reverse timeline
					timelineRef.current.timeScale(5).reversed(true)
				}
			}
		},
		{ scope: elementRef, dependencies: [isVisible, continuousDuration] }
	)

	return (
		<div ref={elementRef} className={cn(styles.animatedElement, className)}>
			{children}
		</div>
	)
}

export default AnimatedElement
