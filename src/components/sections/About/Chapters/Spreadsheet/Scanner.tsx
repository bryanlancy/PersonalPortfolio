import { forwardRef, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'

import styles from './Scanner.module.scss'
import { useSpreadsheetContext } from '@/context/spreadsheetContext'

gsap.registerPlugin(useGSAP, MotionPathPlugin, DrawSVGPlugin)

const ScannerGun = forwardRef<HTMLDivElement>(({}, ref) => {
	return (
		<div ref={ref} className={styles.scannerGun}>
			<svg
				id='scannerBeam'
				className={styles.beam}
				height='110'
				width='200'
				xmlns='http://www.w3.org/2000/svg'>
				<linearGradient id='beamGradient'>
					<stop className={styles.color1} offset='0%' />
					<stop className={styles.color2} offset='100%' />
				</linearGradient>
				<polygon points='10,55 190,5 152,105' />
			</svg>
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'>
				<path d='M32 208c0-61.9 50.1-112 112-112h200.7c29.2 0 51.6 25.9 47.5 54.8l-18.3 128c-3.4 23.6-23.6 41.2-47.5 41.2H320l-26.1 182.8c-3.4 23.6-23.6 41.2-47.5 41.2H192c-26.5 0-48-21.5-48-48V320c-61.9 0-112-50.1-112-112z' />
			</svg>
		</div>
	)
})

const Scanner = () => {
	const { scannerXState } = useSpreadsheetContext()
	const scannerRef = useRef<HTMLDivElement>(null)
	const wireRef = useRef<SVGPathElement>(null)

	const points = [
		[260, -30],
		[240, 40],
		[140, 30],
		[75, 70],
		[50, 65],
	]
	const wirePath = MotionPathPlugin.rawPathToString(
		MotionPathPlugin.arrayToRawPath(
			points.map(p => {
				return { x: p[0], y: p[1] }
			}),
			{ curviness: 1 }
		)
	)

	useGSAP(() => {
		if (wireRef.current) {
			const scannerTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: 'top center',
					end: '+=300px',
					fastScrollEnd: true,
					toggleActions: 'play complete none reverse',
				},
			})
			scannerTl.to(`.${styles.scannerContainer}`, {
				autoAlpha: 1,
				duration: 0.1,
			})
			scannerTl.to(`.${styles.scannerGun}`, {
				motionPath: {
					path: wireRef.current,
					align: wireRef.current,
					alignOrigin: [0.3, 0.5],
					autoRotate: 270,
				},
				onComplete: () => {
					const rect = scannerRef.current?.getBoundingClientRect()
					if (rect) scannerXState[1](rect.left)
				},
			})
			scannerTl.fromTo(
				`.${styles.wire}`,
				{
					drawSVG: '0% 0%',
				},
				{
					drawSVG: '0% 100%',
				},
				'<'
			)
		}
	}, [])

	return (
		<div className={styles.scannerContainer}>
			<ScannerGun ref={scannerRef} />
			<svg className={styles.wireContainer} viewBox='0 0 300 100'>
				<path ref={wireRef} className={styles.wire} d={wirePath}></path>
			</svg>
		</div>
	)
}

export default Scanner
