import { FC, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'

import { cn } from '@/utils/react'

import styles from './AnimatedBee.module.scss'
import { Coord, getSVGPathData } from './helpers'
import { randomInteger } from '@/utils/general'

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollTrigger, DrawSVGPlugin)

type BasicBox = [Coord, Coord]

//==============================

interface AnimatedBeeProps {
	width: number
	height: number
	index: number
}
const AnimatedBee: FC<AnimatedBeeProps> = ({ width, height, index }) => {
	const pathData = useRef<string>('')
	const pathDashedRef = useRef<SVGPathElement>(null)
	const pathMaskRef = useRef<SVGPathElement>(null)
	const beeRef = useRef<SVGSVGElement>(null)

	useGSAP(() => {
		const pathDataString = getSVGPathData(
			5,
			{ min: 0, max: width },
			{ min: 0, max: height },
			'curve'
		)
		console.log(pathDataString)
		pathData.current = pathDataString

		if (pathDashedRef.current) {
			gsap.set(beeRef.current, {
				xPercent: -50,
				yPercent: -50,
				transformOrigin: '50% 50%',
			})

			const beeTimeline = gsap.timeline({
				defaults: { duration: 1 },
				scrollTrigger: {
					trigger: '.TwoBeeksContainer',
					start: `top center+=${randomInteger(0, 300)}`,
					end: `bottom center-=${randomInteger(150, 450)}px`,
					scrub: 1,
				},
			})

			beeTimeline.fromTo(
				pathMaskRef.current,
				{ drawSVG: '0% 0%' },
				{ drawSVG: '95% 100%' }
			)
			beeTimeline.to(
				beeRef.current,
				{
					motionPath: {
						path: pathDashedRef.current,
						align: pathDashedRef.current,
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
				ref={beeRef}
				className={cn(styles.bee, styles.bee1)}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 576 512'>
				<path d='M196.7 4.7c6.2-6.2 16.4-6.2 22.6 0l34.8 34.8c10.3-4.8 21.8-7.5 33.9-7.5s23.6 2.7 33.9 7.5l34.8-34.8c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-31.5 31.5C360.4 73 368 91.6 368 112c0 3-.2 6-.5 8.9C390.3 105 419 96 448 96c65 0 128 44.9 128 112 0 61.9-53.6 104.9-112.9 111.2.6-5.1.9-10.2.9-15.2 0-16.8-2.4-33.1-6.8-48.5 35.2-3.6 54.8-27.9 54.8-47.5 0-21.3-22.9-48-64-48-34.8 0-56.6 19.2-62.4 38.1 28.6 26.3 46.4 64 46.4 105.9 0 83.8-103.6 179.7-129.9 202.8-3.9 3.4-8.9 5.2-14.1 5.2s-10.2-1.8-14.1-5.2C247.6 483.7 144 387.8 144 304c0-41.9 17.9-79.6 46.4-105.9-5.8-18.9-27.6-38.1-62.4-38.1-41.1 0-64 26.7-64 48 0 19.6 19.5 43.9 54.8 47.5-4.4 15.4-6.8 31.7-6.8 48.5 0 5 .3 10.1.9 15.2C53.6 312.9 0 269.9 0 208 0 140.9 63 96 128 96c29 0 57.7 9 80.5 24.9-.3-2.9-.5-5.9-.5-8.9 0-20.4 7.6-39 20.2-53.2l-31.5-31.5c-6.2-6.2-6.2-16.4 0-22.6zm52.8 384.1c12.8 16.4 26.5 31.3 38.5 43.4 12-12.1 25.7-27 38.5-43.4 1.2-1.6 2.5-3.2 3.7-4.8h-84.4c1.2 1.6 2.4 3.2 3.7 4.8zM359.6 336c5.6-12.6 8.4-23.4 8.4-32H208c0 8.6 2.8 19.4 8.4 32h143.2zm-7.6-80c-14.6-19.4-37.8-32-64-32s-49.4 12.6-64 32h128z' />
			</svg>
			{/* Bee Trail, Dashed path and mask */}
			<svg className={styles.outline} viewBox={`0 0 ${width} ${height}`}>
				<defs>
					<mask id={`pathMask-${index}`}>
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
					mask={`url(#pathMask-${index})`}
					d={pathData.current}></path>
			</svg>
		</div>
	)
}

interface SwarmProps {
	count: number
	box: BasicBox
	deadZone?: BasicBox
	className?: string
}

export const Swarm: FC<SwarmProps> = ({
	count,
	box,
	deadZone,
	className = '',
}) => {
	const bees: JSX.Element[] = []
	for (let i = 0; i < count; i++) {
		bees.push(
			<AnimatedBee key={`bee-${i}`} width={250} height={50} index={i} />
		)
	}
	return <div className={cn(styles.container, className)}>{bees}</div>
}
