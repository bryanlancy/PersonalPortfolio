import { forwardRef, useImperativeHandle } from 'react'

import { cn } from '@/utils/react'

export interface CircularImageProps {
	imageUrl: string
	className?: string
	radius?: number
	pathRadius?: number
	x?: number
	y?: number
}

export interface CircularImageRef {
	getPathData: (
		circleFraction?: number,
		startPosition?: 'top' | 'right' | 'bottom' | 'left'
	) => string
	getCenter: () => { x: number; y: number }
	getRadius: () => number
	getPathRadius: () => number
}

/**
 * CircularImage component that displays an image within a circular SVG element
 * with an accessible circular path surrounding it.
 */
function CircularImage(
	{
		imageUrl,
		className,
		radius = 50,
		pathRadius,
		x = 100,
		y = 100,
	}: CircularImageProps,
	ref: React.Ref<CircularImageRef>
) {
	// Calculate path radius (slightly larger than circle radius)
	const actualPathRadius = pathRadius || radius + 20

	const getPathData = (
		circleFraction: number = 0.5,
		startPosition: 'top' | 'right' | 'bottom' | 'left' = 'left'
	) => {
		// Clamp circleFraction between 0 and 1
		const fraction = Math.max(0, Math.min(1, circleFraction))

		// Calculate starting position based on startPosition parameter
		const getStartPosition = () => {
			switch (startPosition) {
				case 'top':
					return { x: x, y: y - actualPathRadius }
				case 'right':
					return { x: x + actualPathRadius, y: y }
				case 'bottom':
					return { x: x, y: y + actualPathRadius }
				case 'left':
					return { x: x - actualPathRadius, y: y }
				default:
					return { x: x, y: y - actualPathRadius }
			}
		}

		const startPos = getStartPosition()

		// Handle full circle case (fraction = 1)
		if (fraction >= 1) {
			// Create a complete circle using two semicircles
			return `M ${
				x - actualPathRadius
			} ${y} A ${actualPathRadius} ${actualPathRadius} 0 1 1 ${
				x + actualPathRadius
			} ${y} A ${actualPathRadius} ${actualPathRadius} 0 1 1 ${
				x - actualPathRadius
			} ${y} Z`
		}

		// Calculate the angle offset based on start position
		const getAngleOffset = () => {
			switch (startPosition) {
				case 'top':
					return -Math.PI / 2
				case 'right':
					return 0
				case 'bottom':
					return Math.PI / 2
				case 'left':
					return Math.PI
				default:
					return -Math.PI / 2
			}
		}

		const angleOffset = getAngleOffset()
		const angle = fraction * 2 * Math.PI + angleOffset

		// Calculate the end point of the arc
		const endX = x + actualPathRadius * Math.cos(angle)
		const endY = y + actualPathRadius * Math.sin(angle)

		// Determine if we need the large arc flag
		const largeArcFlag = fraction > 0.5 ? 1 : 0

		return `M ${startPos.x} ${startPos.y} A ${actualPathRadius} ${actualPathRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`
	}

	const getCenter = () => {
		return {
			x,
			y,
		}
	}

	const getRadius = () => radius

	const getPathRadius = () => actualPathRadius

	// Expose methods through ref
	useImperativeHandle(
		ref,
		() => ({
			getPathData,
			getCenter,
			getRadius,
			getPathRadius,
		}),
		[radius, actualPathRadius, x, y]
	)

	return (
		<g className={className}>
			<defs>
				<clipPath
					id={`imageClip-${imageUrl.replace(/[^a-zA-Z0-9]/g, '')}`}>
					<circle cx={x} cy={y} r={radius} />
				</clipPath>
			</defs>

			{/* Circular path surrounding the image */}
			<path
				d={getPathData(1.1)}
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
			/>

			{/* Main circular image using clipPath */}
			<image
				href={imageUrl}
				width={radius * 2}
				height={radius * 2}
				x={x - radius}
				y={y - radius}
				preserveAspectRatio='xMidYMid slice'
				clipPath={`url(#imageClip-${imageUrl.replace(
					/[^a-zA-Z0-9]/g,
					''
				)})`}
			/>
		</g>
	)
}

export default forwardRef<CircularImageRef, CircularImageProps>(CircularImage)
