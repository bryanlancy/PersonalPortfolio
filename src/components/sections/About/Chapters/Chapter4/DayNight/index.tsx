import { FC, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMoon,
	faSunBright,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'

import styles from './DayNight.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin)

interface DayNightProps {
	start: number
}

const DayNight: FC<DayNightProps> = ({ start }) => {
	const sunMoonRef = useRef<SVGPathElement>(null)

	const svgWidth = 120
	const svgHeight = 40

	const anchors: gsap.Point2D[] = [
		{ x: -5, y: svgHeight },
		{ x: svgWidth / 2, y: svgHeight * 0.05 },
		{ x: svgWidth + 5, y: svgHeight },
	]
	const sunMoonPath = MotionPathPlugin.arrayToRawPath(anchors, {
		curviness: 2,
	})
	const sunMoonD = MotionPathPlugin.rawPathToString(sunMoonPath)

	useGSAP(() => {
		const dayNightTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: `top top-=${start}px`,
				end: '+=300px',
				// scrub:true
			},
		})
		dayNightTl.to(`.${styles.container}`, {
			autoAlpha: 1,
		})

		if (sunMoonRef.current) {
			const numDays = 2
			const cycleLength = 600

			const sunMoonTl = gsap.timeline({
				repeat: numDays - 1,
				scrollTrigger: {
					trigger: '.chapter4',
					start: `top top-=${start}px`,
					end: `+=${numDays * cycleLength * 2}px`,
					scrub: true,
				},
			})
			sunMoonTl.addLabel('nightStart')
			sunMoonTl.to(`.${styles.moon}`, {
				autoAlpha: 1,
				duration: 0.25,
			})
			sunMoonTl.to(
				`.${styles.moon}`,
				{
					duration: 1,
					motionPath: {
						path: sunMoonRef.current,
						align: sunMoonRef.current,
						alignOrigin: [0.5, 0.5],
						autoRotate: 180,
					},
				},
				'<'
			)
			sunMoonTl.to(
				`.${styles.moon}`,
				{
					autoAlpha: 0,
					duration: 0.75,
				},
				'>-.5'
			)
			sunMoonTl.to(
				'.chapter4',
				{
					duration: 0.5,
					backgroundColor: '#1d005c',
				},
				'nightStart'
			)
			sunMoonTl.addLabel('dayStart')
			sunMoonTl.to(`.${styles.sun}`, {
				autoAlpha: 1,
				duration: 0.25,
			})
			sunMoonTl.to(
				`.${styles.sun}`,
				{
					duration: 1,
					motionPath: {
						path: sunMoonRef.current,
						align: sunMoonRef.current,
						alignOrigin: [0.5, 0.5],
						autoRotate: 180,
					},
				},
				'<'
			)
			sunMoonTl.to(
				`.${styles.sun}`,
				{
					autoAlpha: 0,
					duration: 0.75,
				},
				'>-.5'
			)
			sunMoonTl.to(
				`.chapter4`,
				{
					duration: 0.5,
					backgroundColor: '#00a2ff',
				},
				'dayStart'
			)
			sunMoonTl.to('.chapter4', {
				duration: 0.5,
				backgroundColor: '#000',
			})
		}
	}, [])

	return (
		<div className={styles.container}>
			<FontAwesomeIcon className={styles.moon} icon={faMoon} />
			<FontAwesomeIcon className={styles.sun} icon={faSunBright} />

			<svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
				<path
					ref={sunMoonRef}
					className={styles.sunMoonPath}
					d={sunMoonD}></path>
			</svg>
		</div>
	)
}

export default DayNight
