import { forwardRef, useImperativeHandle } from 'react'

import { cn } from '@/utils/react'

import styles from './CircularImage.module.scss'

export interface CircularImageProps {
	imageUrl: string
	className?: string
	radius?: number
	pathRadius?: number
	x?: number
	y?: number
}

export interface CircularImageRef {
	getPathData: () => string
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

	const getPathData = () => {
		return `M ${
			x - actualPathRadius
		} ${y} A ${actualPathRadius} ${actualPathRadius} 0 1 1 ${
			x + actualPathRadius
		} ${y} A ${actualPathRadius} ${actualPathRadius} 0 1 1 ${
			x - actualPathRadius
		} ${y}`
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
		<g className={cn(styles.circularImage, className)}>
			<defs>
				<clipPath
					id={`imageClip-${imageUrl.replace(/[^a-zA-Z0-9]/g, '')}`}>
					<circle cx={x} cy={y} r={radius} />
				</clipPath>
			</defs>

			{/* Circular path surrounding the image */}
			<path
				d={getPathData()}
				className={styles.circularPath}
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
				className={styles.imageCircle}
			/>
		</g>
	)
}

export default forwardRef<CircularImageRef, CircularImageProps>(CircularImage)
