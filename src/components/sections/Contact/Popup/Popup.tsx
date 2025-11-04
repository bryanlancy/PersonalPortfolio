import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from './Popup.module.scss'

import { cn } from '@/utils/react'

gsap.registerPlugin(useGSAP)

type PopupType = 'success' | 'error'

interface PopupProps {
	text: string
	type: PopupType
	x: number // Relative to copy button
	y: number // Relative to copy button
	duration?: number
	onComplete: () => void
	className?: string
}

export default function Popup({
	text,
	type,
	x,
	y,
	duration = 0.25,
	onComplete,
	className,
}: PopupProps) {
	const popupRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			if (!popupRef.current) return

			const element = popupRef.current

			// Position popup: center horizontally on x, position at y (already includes 40px offset from CopyButton)
			// Use left and top for positioning, then center with xPercent
			gsap.set(element, {
				left: `${x}px`,
				top: `${y}px`, // y already includes 40px offset from CopyButton
				xPercent: -50, // Center horizontally on x coordinate
				transformOrigin: '50% 50%', // Center origin
				autoAlpha: 0,
				scale: 0.5,
				y: 20, // Start slightly below for animation effect
			})

			// Create complete animation timeline
			const tl = gsap.timeline({
				onComplete: () => {
					// Notify parent that animation is complete
					onComplete()
				},
			})

			// Animate in
			tl.to(element, {
				autoAlpha: 1,
				scale: 1,
				y: 0, // Animate to final position
				duration: 0.3,
				ease: 'back.out(1.7)',
			})
				// Wait for duration, then fade out
				.to(
					element,
					{
						autoAlpha: 0,
						scale: 0.8,
						duration: 0.2,
						ease: 'power2.in',
					},
					`+=${duration}` // Wait duration seconds before fading out
				)
		},
		{ scope: popupRef, dependencies: [x, y] }
	)

	return (
		<div
			ref={popupRef}
			className={cn(
				styles.popup,
				[type === 'success', styles.popupSuccess],
				[type === 'error', styles.popupFailed],
				className
			)}>
			{text}
		</div>
	)
}

