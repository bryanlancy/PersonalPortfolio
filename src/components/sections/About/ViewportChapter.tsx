'use client'

import { useRef, useEffect, useState, ReactNode, RefObject } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utils/react'
import { useViewportVisibility } from '@/hooks/useViewportVisibility'
import styles from './ViewportChapter.module.scss'

interface ViewportChapterProps {
	children: ReactNode
	/** Additional className for the wrapper */
	className?: string
	/** Root margin for IntersectionObserver (default: '200vh') */
	rootMargin?: string
	/** Callback when visibility changes */
	onVisibilityChange?: (isVisible: boolean) => void
}

/**
 * Wrapper component that conditionally renders children based on viewport visibility.
 * Preserves DOM structure for GSAP ScrollTriggers by using visibility instead of unmounting.
 *
 * This ensures GSAP pinning and scroll calculations remain accurate while reducing
 * CPU usage for off-screen animations.
 */
export default function ViewportChapter({
	children,
	className,
	rootMargin = '200vh',
	onVisibilityChange,
}: ViewportChapterProps) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [shouldRender, setShouldRender] = useState(true)
	const [isHidden, setIsHidden] = useState(false)

	const { isVisible } = useViewportVisibility(wrapperRef, {
		rootMargin,
		threshold: 0,
		enabled: true,
	})

	useEffect(() => {
		// When element becomes visible, render if not already rendered
		if (isVisible && !shouldRender) {
			setShouldRender(true)
			// Small delay to ensure DOM is ready before refreshing ScrollTrigger
			const timer = setTimeout(() => {
				ScrollTrigger.refresh()
			}, 50)
			return () => clearTimeout(timer)
		}

		// When element goes out of view, mark as hidden but keep rendered
		if (!isVisible && shouldRender) {
			setIsHidden(true)
		} else if (isVisible) {
			setIsHidden(false)
		}

		onVisibilityChange?.(isVisible)
	}, [isVisible, shouldRender, onVisibilityChange])

	// Keep DOM structure but hide visually when out of view
	return (
		<div
			ref={wrapperRef}
			className={cn(styles.viewportChapter, className, {
				[styles.hidden]: isHidden,
			})}
			style={{
				visibility: isHidden ? 'hidden' : 'visible',
				pointerEvents: isHidden ? 'none' : 'auto',
			}}>
			{shouldRender ? children : null}
		</div>
	)
}

