import { FC, useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'

import { randomInteger } from '@/utils/general'
import { cn } from '@/utils/react'

import styles from './AnimatedBee.module.scss'

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollTrigger, DrawSVGPlugin)

type Coord = [number, number]

type BasicBox = [Coord, Coord]

// function generateRandomWalkCurve(
// 	numPoints: number,
// 	xRange: NumberRange,
// 	yRange: NumberRange
// ): { x: number; y: number }[] {
// 	const points = []
// 	let currentX = xRange.min + Math.random() * (xRange.max - xRange.min)
// 	let currentY = yRange.min + Math.random() * (yRange.max - yRange.min)

// 	points.push({ x: currentX, y: currentY })

// 	for (let i = 1; i < numPoints; i++) {
// 		currentX +=
// 			((Math.random() - 0.5) * (xRange.max - xRange.min)) / numPoints // Small random step in X
// 		currentY +=
// 			((Math.random() - 0.5) * (yRange.max - yRange.min)) / numPoints // Small random step in Y

// 		// Clamp coordinates within the defined range if desired
// 		currentX = Math.max(xRange.min, Math.min(xRange.max, currentX))
// 		currentY = Math.max(yRange.min, Math.min(yRange.max, currentY))

// 		points.push({ x: currentX, y: currentY })
// 	}
// 	return points
// }

// // Example usage:
// const curvePoints = generateRandomWalkCurve(
// 	50,
// 	{ min: 0, max: 200 },
// 	{ min: 0, max: 100 }
// )

// Animated Walking
function getDistance(pointA: Coord, pointB: Coord) {
	return Math.sqrt(
		(pointA[0] - pointB[0]) ** 2 + (pointA[1] - pointB[1]) ** 2
	)
}

function getAngle(...points: Coord[]) {
	const [pointA, pointB, pointC] = points
	// angle to pointB
	let a = getDistance(pointA, pointB)
	let b = getDistance(pointB, pointC)
	let c = getDistance(pointC, pointA)
	return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI)
}
function getPoint(width: number, height: number, random = true) {
	const minDistance = height / 6
	const maxDistance = height
	const lastTwoPoints: Coord[] = []
	let x = random ? randomInteger(0, width * 0.6) + width * 0.2 : width
	let y = random ? randomInteger(0, height * 0.8) + height * 0.2 : height

	let point: Coord = [x, y]
	if (lastTwoPoints.length < 2) {
		lastTwoPoints.push(point)
	} else {
		if (
			getAngle(...lastTwoPoints, point) > 20 ||
			getDistance(lastTwoPoints[1], point) < minDistance ||
			getDistance(lastTwoPoints[1], point) > maxDistance
		) {
			point = getPoint(width, height)
		} else {
			lastTwoPoints.shift()
			lastTwoPoints.push(point)
		}
	}
	return point
}

function pointString(width: number, height: number, random = true) {
	let point = getPoint(width, height, random)
	return `${point[0]} ${point[1]} `
}

function createPath(numPoints: number, w: number, h: number) {
	const startPoint = `M ${pointString(
		0,
		randomInteger(0, h),
		false
	)} C ${pointString(w, h)} ${pointString(w, h)} ${pointString(w, h)}`

	const finalPoint = `C ${pointString(
		randomInteger(0, w),
		randomInteger(0, h)
	)} ${pointString(randomInteger(0, w), randomInteger(0, h))} ${pointString(
		w,
		h,
		false
	)} `

	let pathString = ''

	for (let i = 0; i < numPoints - 2; i++) {
		pathString += `S ${pointString(w, h)} ${pointString(w, h)} `
	}
	return startPoint + pathString + finalPoint
}

//==============================

interface BeesProps {
	count: number
	box: BasicBox
	deadZone?: BasicBox
	className?: string
}

interface AnimatedBeeProps {
	width: number
	height: number
}
const AnimatedBee: FC<AnimatedBeeProps> = ({ width, height }) => {
	const pathData = useRef<string>('')
	const pathDashedRef = useRef<SVGPathElement>(null)
	const pathMaskRef = useRef<SVGPathElement>(null)

	useGSAP(() => {
		pathData.current = createPath(5, width, height)
		if (pathDashedRef.current) {
			gsap.set(`.${styles.bee1}`, {
				xPercent: -50,
				yPercent: -50,
				transformOrigin: '50% 50%',
			})

			const beeTimeline = gsap.timeline({
				defaults: { duration: 1 },
				scrollTrigger: {
					trigger: '.TwoBeeksContainer',
					start: 'top center',
					end: 'bottom center-=300px',
					scrub: 1,
				},
			})

			beeTimeline.fromTo(
				`.${styles.pathMask}`,
				{ drawSVG: '0% 0%' },
				{ drawSVG: '90% 100%' }
			)
			beeTimeline.to(
				`.${styles.bee1}`,
				{
					motionPath: {
						path: `.${styles.pathDashed}`,
						align: `.${styles.pathDashed}`,
						alignOrigin: [0.5, 0.5],
						autoRotate: 90,
					},
				},
				'<'
			)
		}
	}, [])

	return (
		<div className={styles.beeContainer}>
			{/* Bee */}
			<svg
				className={cn(styles.bee, styles.bee1)}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 576 512'>
				<path d='M196.7 4.7c6.2-6.2 16.4-6.2 22.6 0l34.8 34.8c10.3-4.8 21.8-7.5 33.9-7.5s23.6 2.7 33.9 7.5l34.8-34.8c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-31.5 31.5C360.4 73 368 91.6 368 112c0 3-.2 6-.5 8.9C390.3 105 419 96 448 96c65 0 128 44.9 128 112 0 61.9-53.6 104.9-112.9 111.2.6-5.1.9-10.2.9-15.2 0-16.8-2.4-33.1-6.8-48.5 35.2-3.6 54.8-27.9 54.8-47.5 0-21.3-22.9-48-64-48-34.8 0-56.6 19.2-62.4 38.1 28.6 26.3 46.4 64 46.4 105.9 0 83.8-103.6 179.7-129.9 202.8-3.9 3.4-8.9 5.2-14.1 5.2s-10.2-1.8-14.1-5.2C247.6 483.7 144 387.8 144 304c0-41.9 17.9-79.6 46.4-105.9-5.8-18.9-27.6-38.1-62.4-38.1-41.1 0-64 26.7-64 48 0 19.6 19.5 43.9 54.8 47.5-4.4 15.4-6.8 31.7-6.8 48.5 0 5 .3 10.1.9 15.2C53.6 312.9 0 269.9 0 208 0 140.9 63 96 128 96c29 0 57.7 9 80.5 24.9-.3-2.9-.5-5.9-.5-8.9 0-20.4 7.6-39 20.2-53.2l-31.5-31.5c-6.2-6.2-6.2-16.4 0-22.6zm52.8 384.1c12.8 16.4 26.5 31.3 38.5 43.4 12-12.1 25.7-27 38.5-43.4 1.2-1.6 2.5-3.2 3.7-4.8h-84.4c1.2 1.6 2.4 3.2 3.7 4.8zM359.6 336c5.6-12.6 8.4-23.4 8.4-32H208c0 8.6 2.8 19.4 8.4 32h143.2zm-7.6-80c-14.6-19.4-37.8-32-64-32s-49.4 12.6-64 32h128z' />
			</svg>
			{/* Bee Trail, Dashed path and mask */}
			<svg className={styles.outline} viewBox={`0 0 ${width} ${height}`}>
				<defs>
					<mask id='pathMask'>
						<path
							className={cn(styles.path, styles.pathMask)}
							ref={pathMaskRef}
							strokeWidth={2}
							stroke='black'
							d={pathData.current}></path>
					</mask>
				</defs>

				<path
					id='pathDashed'
					className={cn(styles.path, styles.pathDashed)}
					ref={pathDashedRef}
					// mask="url('#pathMask'"
					d={pathData.current}></path>
			</svg>
		</div>
	)
}

export const Swarm: FC<BeesProps> = ({ box, deadZone, className = '' }) => {
	return (
		<div className={cn(styles.container, className)}>
			<AnimatedBee width={250} height={50} />
		</div>
	)
}
