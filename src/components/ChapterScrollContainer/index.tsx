import { useRef, PropsWithChildren } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './ChapterScrollContainer.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ChapterScrollContainerProps extends PropsWithChildren {
	/**
	 * Optional CSS class name to apply to the container element.
	 * Use this prop to pass through additional styling or override default styles.
	 *
	 * @example
	 * ```tsx
	 * <ChapterScrollContainer
	 *   triggerClassName="chapter1-container"
	 *   scrollDistance={3000}
	 *   className={styles.customContainer}>
	 *   Your content here
	 * </ChapterScrollContainer>
	 * ```
	 */
	className?: string
	/**
	 * The CSS class name to use as the trigger selector for the GSAP ScrollTrigger.
	 * This class will be applied to the container element and used to identify it in ScrollTrigger animations.
	 *
	 * **Important:** Ensure this class name is unique within your component scope to avoid conflicts.
	 *
	 * @example
	 * ```tsx
	 * <ChapterScrollContainer
	 *   triggerClassName="chapter1-container"
	 *   scrollDistance={3000}>
	 *   Your content here
	 * </ChapterScrollContainer>
	 * ```
	 */
	triggerClassName: string
	/**
	 * The scroll distance in pixels that the container will be pinned.
	 * This value is passed to the GSAP ScrollTrigger's `end` property using the format `+=${scrollDistance}`.
	 * The container will remain pinned to the viewport until the user scrolls this many pixels.
	 *
	 * @example
	 * ```tsx
	 * <ChapterScrollContainer
	 *   triggerClassName="chapter1-container"
	 *   scrollDistance={3000}>
	 *   Your content here
	 * </ChapterScrollContainer>
	 * ```
	 */
	scrollDistance: number
}

/**
 * A container component that provides a pinned scroll behavior using GSAP ScrollTrigger.
 *
 * This component wraps content and creates a scroll animation that pins the container
 * to the viewport for a specified scroll distance. When the user scrolls, the container
 * remains fixed in place while the content scrolls around it, creating a parallax-like effect.
 *
 * **Key Features:**
 * - Automatically registers GSAP plugins (useGSAP and ScrollTrigger)
 * - Creates a ref for the container element for reliable animation targeting
 * - Pins the container to the top of the viewport during scroll
 * - Configurable scroll distance to control pin duration
 * - Supports custom class names for styling and trigger identification
 *
 * **Usage:**
 * This component is designed to be used within chapter sections of scroll-based narratives,
 * typically within the About section or similar storytelling components.
 *
 * @component
 * @example
 * Basic usage with required props:
 * ```tsx
 * <ChapterScrollContainer
 *   triggerClassName="chapter1-container"
 *   scrollDistance={3000}>
 *   <h1>Chapter Title</h1>
 *   <p>Chapter content...</p>
 * </ChapterScrollContainer>
 * ```
 *
 * @example
 * With custom scroll distance and trigger class:
 * ```tsx
 * <ChapterScrollContainer
 *   triggerClassName="chapter4-container"
 *   scrollDistance={4750}
 *   className={styles.customChapter}>
 *   <h1>The Arduino Moment</h1>
 *   <p>In 2015, while trying to solve my own problem...</p>
 * </ChapterScrollContainer>
 * ```
 *
 * @example
 * With additional styling:
 * ```tsx
 * <ChapterScrollContainer
 *   triggerClassName="c1-container"
 *   scrollDistance={3000}
 *   className={cn(styles.chapterContainer, styles.extraStyle)}>
 *   <Container>
 *     <h1>How it Started</h1>
 *     {/* Additional content *\/}
 *   </Container>
 * </ChapterScrollContainer>
 * ```
 *
 * **GSAP ScrollTrigger Configuration:**
 * - `start: 'top top'` - Pinning begins when the top of the container reaches the top of the viewport
 * - `end: '+=${scrollDistance}'` - Pinning ends after scrolling the specified distance
 * - `pin: true` - The container is pinned to the viewport during the scroll duration
 *
 * **Best Practices:**
 * - Use unique `triggerClassName` values to avoid selector conflicts
 * - Adjust `scrollDistance` based on your content length and desired scroll speed
 * - Wrap complex content in additional Container components for consistent layout
 * - Combine with other GSAP animations within the parent component for rich scroll experiences
 *
 * **Technical Details:**
 * - Uses `useRef` to create a stable reference to the container element
 * - Leverages `useGSAP` for React-safe GSAP animations
 * - Automatically cleans up ScrollTrigger instances on unmount
 * - The container element becomes both the trigger and target for the pin animation
 *
 * @see {@link https://gsap.com/resources/React/} for GSAP React integration
 * @see {@link https://gsap.com/docs/v3/Plugins/ScrollTrigger/} for ScrollTrigger documentation
 */
const ChapterScrollContainer = (props: ChapterScrollContainerProps) => {
	const { children, className, triggerClassName, scrollDistance } = props
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		/**
		 * Creates a GSAP ScrollTrigger animation that pins the container to the viewport.
		 *
		 * The animation target is determined by the following priority:
		 * 1. The ref if containerRef.current is available (preferred for React best practices)
		 * 2. The triggerClassName selector as a fallback
		 *
		 * Using the ref is the React-safe approach, but triggerClassName is kept as a fallback
		 * for compatibility with existing chapter implementations that rely on class selectors.
		 */
		const target = containerRef.current || `.${triggerClassName}`

		gsap.to(target, {
			scrollTrigger: {
				trigger: target,
				start: 'top top',
				end: `+=${scrollDistance}`,
				pin: true,
			},
		})
	}, [])

	return (
		<div
			ref={containerRef}
			className={cn(styles.container, className, triggerClassName)}>
			{children}
		</div>
	)
}

export default ChapterScrollContainer
