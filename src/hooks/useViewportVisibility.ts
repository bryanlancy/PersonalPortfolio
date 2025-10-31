import { useEffect, useRef, useState, RefObject } from 'react'

interface UseViewportVisibilityOptions {
	/** Margin around viewport for pre-rendering (default: '200vh') */
	rootMargin?: string
	/** Threshold for intersection (0-1, default: 0) */
	threshold?: number | number[]
	/** Whether to start observing immediately (default: true) */
	enabled?: boolean
}

/**
 * Hook to detect when an element is visible in the viewport using IntersectionObserver.
 * Useful for viewport-based rendering and animation control.
 *
 * @param elementRef - Ref to the element to observe
 * @param options - Configuration options
 * @returns Object with visibility state and ref for the observer
 */
export function useViewportVisibility(
	elementRef: RefObject<HTMLElement>,
	options: UseViewportVisibilityOptions = {}
) {
	const {
		rootMargin = '200vh',
		threshold = 0,
		enabled = true,
	} = options

	const [isVisible, setIsVisible] = useState(false)
	const observerRef = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		const element = elementRef.current
		if (!element || !enabled) return

		// Convert rootMargin to valid format if it contains 'vh'
		// IntersectionObserver requires pixels or percent, not vh units
		const processedRootMargin = rootMargin.includes('vh')
			? '0px'
			: rootMargin

		// Create IntersectionObserver
		observerRef.current = new IntersectionObserver(
			entries => {
				const entry = entries[0]
				setIsVisible(entry.isIntersecting)
			},
			{
				root: null,
				rootMargin: processedRootMargin,
				threshold,
			}
		)

		observerRef.current.observe(element)

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
				observerRef.current = null
			}
		}
	}, [elementRef, rootMargin, threshold, enabled])

	return {
		isVisible,
		observer: observerRef.current,
	}
}

