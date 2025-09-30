import { SVGProps, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'

import styles from './Scanner.module.scss'

gsap.registerPlugin(useGSAP, MotionPathPlugin, DrawSVGPlugin)

const ScannerGun = () => {
	return (
		<div className={styles.scannerGun}>
			<svg
				className={styles.beam}
				height='220'
				width='500'
				xmlns='http://www.w3.org/2000/svg'>
				<polygon points='100,10 150,190 50,190' />
			</svg>
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'>
				<path
					d='M32 208c0-61.9 50.1-112 112-112h200.7c29.2 0 51.6 25.9 47.5 54.8l-18.3 128c-3.4 23.6-23.6 41.2-47.5 41.2H320l-26.1 182.8c-3.4 23.6-23.6 41.2-47.5 41.2H192c-26.5 0-48-21.5-48-48V320c-61.9 0-112-50.1-112-112z'
					// opacity={1}
				/>
				{/* <path d='M472 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h112c13.3 0 24-10.7 24-24s-10.7-24-24-24H472zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24h112c13.3 0 24-10.7 24-24s-10.7-24-24-24H472zm-24 264c0 13.3 10.7 24 24 24h112c13.3 0 24-10.7 24-24s-10.7-24-24-24H472c-13.3 0-24 10.7-24 24zm16-328c-8.8 0-16 7.2-16 16s7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H464zm-16 176c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H464c-8.8 0-16 7.2-16 16zm16 48c-8.8 0-16 7.2-16 16s7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H464z' /> */}
			</svg>
		</div>
	)
}

const Scanner = () => {
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
					end: '+=1px',
					onUpdate: self => {
						scannerTl.reversed(self.direction > 0 ? false : true)
					},
				},
			})
			scannerTl.to(`.${styles.scannerGun}`, {
				motionPath: {
					path: wireRef.current,
					align: wireRef.current,
					alignOrigin: [0.3, 0.5],
					autoRotate: 270,
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
			<ScannerGun />
			<svg className={styles.wireContainer} viewBox='0 0 300 100'>
				<path ref={wireRef} className={styles.wire} d={wirePath}></path>
			</svg>
		</div>
	)
}

export default Scanner
