import { FC, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'

import { cn } from '@/utils/react'

import styles from './AnimatedBee.module.scss'
import { getSVGPathData } from './helpers'
import { randomInteger, Coord } from '@/utils/general'

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
					start: `top center+=${randomInteger(0, 300)}px`,
					end: `bottom center-=${randomInteger(450, 750)}px`,
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
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 640 640'
				className={styles.bee}>
				<path
					d='M80 384c0-95.1 69.2-174.1 160-189.3 10.4-1.7 21.1-2.7 32-2.7h96c10.9 0 21.6.9 32 2.7 90.8 15.2 160 94.2 160 189.3v16c0 17.7-14.3 32-32 32h-16c-19.2 0-37.8-2.8-55.3-8.1-7.4-2.2-14.6-4.9-21.5-7.9-25.6-11.1-48.1-27.6-66.4-48-27-30.2-44.7-69.1-48.2-112-.2-2-.3-4.1-.4-6.1l-.2-9.9c0 5.4-.2 10.7-.7 16-3.6 42.9-21.2 81.8-48.3 112-18.2 20.4-40.8 36.9-66.2 48-7.1 3-14.2 5.7-21.6 7.9-17.5 5.3-36 8.1-55.2 8.1h-16c-17.7 0-32-14.3-32-32v-16z'
					opacity={0.4}
				/>
				<path d='M398 512c-25.8 28-52 49.8-63.7 59.1-4.1 3.2-9.1 4.9-14.3 4.9-5.2 0-10.2-1.6-14.3-4.9C294 561.8 267.8 540 242 512h156zm37.3-96c7 3 14.1 5.7 21.5 7.9-5 13.5-12.1 27-20.7 40.1H203.9c-8.5-13.1-15.7-26.6-20.7-40.1 7.4-2.2 14.5-4.8 21.5-7.9h230.5zM320.7 256c3.5 42.9 21.2 81.8 48.2 112H271c27.1-30.2 44.6-69.1 48.2-112h1.4zM375 71c9.4-9.4 24.6-9.4 33.9 0 9.3 9.4 9.4 24.6 0 33.9l-18 18.1c5.8 11.1 9.1 23.6 9.1 37v34.7c-10.4-1.7-21.1-2.7-32-2.7h-96c-10.9 0-21.6.9-32 2.7V160c0-13.3 3.3-25.9 9.1-37L231 105l-1.6-1.8c-7.7-9.4-7.1-23.3 1.7-32.1 8.8-8.8 22.7-9.3 32.1-1.7L265 71l18 18.1c11.1-5.8 23.6-9.1 37-9.1 13.3 0 25.9 3.3 36.9 9.1L375 71z' />
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
	className?: string
}

export const Swarm: FC<SwarmProps> = ({ count, className = '' }) => {
	const bees = Array.from({ length: count }, (_, i) => (
		<AnimatedBee key={`bee-${i}`} width={250} height={50} index={i} />
	))

	return <div className={cn(styles.container, className)}>{bees}</div>
}
