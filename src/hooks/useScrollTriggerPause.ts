import { useEffect, useRef, RefObject } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Hook to automatically pause/resume GSAP timelines and ScrollTriggers
 * when the target element is outside the viewport.
 *
 * This helps reduce CPU usage by ensuring animations only run when visible.
 *
 * @param elementRef - Ref to the element to observe for visibility
 * @param rootMargin - Margin around viewport for triggering visibility (default: '100vh')
 * @param options - Additional options for pause behavior
 */
export function useScrollTriggerPause(
	elementRef: RefObject<HTMLElement>,
	rootMargin: string = '100vh',
	options?: {
		/** Whether to pause ScrollTriggers in addition to timelines */
		pauseScrollTriggers?: boolean
		/** Custom callback when visibility changes */
		onVisibilityChange?: (isVisible: boolean) => void
	}
) {
	const observerRef = useRef<IntersectionObserver | null>(null)
	const timelinesRef = useRef<Set<gsap.core.Timeline>>(new Set())
	const scrollTriggersRef = useRef<Set<ScrollTrigger>>(new Set())
	const isVisibleRef = useRef(true)

	useEffect(() => {
		const element = elementRef.current
		if (!element) return

		// Convert rootMargin to valid format if it contains 'vh'
		// IntersectionObserver requires pixels or percent, not vh units
		const processedRootMargin = rootMargin.includes('vh')
			? '0px'
			: rootMargin

		// Create IntersectionObserver
		observerRef.current = new IntersectionObserver(
			entries => {
				const entry = entries[0]
				const isVisible = entry.isIntersecting
				const wasVisible = isVisibleRef.current
				isVisibleRef.current = isVisible

				if (isVisible === wasVisible) return

				// Pause or resume all registered timelines
				timelinesRef.current.forEach(timeline => {
					if (isVisible) {
						timeline.resume()
					} else {
						timeline.pause()
					}
				})

				// Pause or resume ScrollTriggers if enabled
				if (options?.pauseScrollTriggers) {
					scrollTriggersRef.current.forEach(st => {
						if (isVisible) {
							st.enable()
						} else {
							st.disable()
						}
					})
				}

				options?.onVisibilityChange?.(isVisible)
			},
			{
				root: null,
				rootMargin: processedRootMargin,
				threshold: 0,
			}
		)

		observerRef.current.observe(element)

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
			}
		}
	}, [elementRef, rootMargin, options?.pauseScrollTriggers, options?.onVisibilityChange])

	/**
	 * Register a timeline to be paused/resumed based on visibility
	 */
	const registerTimeline = (timeline: gsap.core.Timeline) => {
		timelinesRef.current.add(timeline)
		if (!isVisibleRef.current) {
			timeline.pause()
		}
		return () => {
			timelinesRef.current.delete(timeline)
		}
	}

	/**
	 * Register a ScrollTrigger to be paused/resumed based on visibility
	 */
	const registerScrollTrigger = (scrollTrigger: ScrollTrigger) => {
		if (!options?.pauseScrollTriggers) return () => {}
		scrollTriggersRef.current.add(scrollTrigger)
		if (!isVisibleRef.current) {
			scrollTrigger.disable()
		}
		return () => {
			scrollTriggersRef.current.delete(scrollTrigger)
		}
	}

	return {
		registerTimeline,
		registerScrollTrigger,
		isVisible: isVisibleRef.current,
	}
}

