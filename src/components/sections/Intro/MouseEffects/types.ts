/**
 * Type definition for a 2D point with x and y coordinates
 */
export type Point = [number, number]

/**
 * Props interface for MouseTrail component
 */
export interface MouseTrailProps {
	/** Optional className to apply to the SVG element */
	className?: string

	/** Optional text to display along the path */
	text?: string

	/** Whether to show debug circles for return points */
	debug?: boolean

	/** Current title that determines background color */
	currentTitle?: string
}

/**
 * Interface for firework data
 */
export interface FireworkData {
	/** Unique identifier for the firework */
	id: string
	/** X coordinate of the firework */
	x: number
	/** Y coordinate of the firework */
	y: number
}

/**
 * Interface for click effects hook return value
 */
export interface ClickEffectsReturn {
	/** Array of click positions for debugging */
	clickPositions: Point[]
	/** Array of active fireworks */
	fireworks: FireworkData[]
	/** Refs for click circle elements */
	clickCircleRefs: React.MutableRefObject<(SVGCircleElement | null)[]>
	/** Handler for click events */
	handleClick: (e: React.MouseEvent<SVGSVGElement>) => void
	/** Handler for removing completed fireworks */
	removeFirework: (fireworkId: string) => void
	/** Handler for animating click points disappear */
	animateClickPointsDisappear: () => void
}
