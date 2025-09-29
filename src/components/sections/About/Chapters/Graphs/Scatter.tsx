import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Coord } from '@/utils/general'
import { generatePoints, lineOfBestFit, printPoint } from '@/utils/svg'

import styles from './Graphs.module.scss'
import { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger)

const Scatter = () => {
	const svgWidth = 1000
	const svgHeight = 1000
	const zeroPos: Coord = { x: svgWidth * 0.1, y: svgHeight * 0.1 }
	const xLinePath = `M ${zeroPos.x} ${svgHeight * 0.9} L ${svgWidth * 0.9} ${
		svgHeight * 0.9
	}`
	const yLinePath = `M ${printPoint(zeroPos)} L ${zeroPos.y} ${
		svgHeight * 0.9
	}`

	const [bestLinePath, setBestLinePath] = useState<string | undefined>(
		undefined
	)
	const xLineRef = useRef<SVGPathElement>(null)
	const yLineRef = useRef<SVGPathElement>(null)
	const bestFitRef = useRef<SVGPathElement>(null)

	const [points] = useState<Coord[]>(
		generatePoints(
			[svgWidth * 0.2, svgWidth * 0.8],
			[svgHeight * 0.2, svgHeight * 0.8],
			25,
			'toit'
		).sort((a, b) => {
			return a.x - b.x
		})
	)

	useGSAP(() => {
		// Axis Lines Animations
		const xTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: 'top top-=2200px',
				end: '+=1px',
				onUpdate: self => {
					xTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		xTl.fromTo(
			xLineRef.current,
			{ drawSVG: '0% 0%' },
			{ drawSVG: '0% 100%', delay: 1 }
		)
		const xTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=100px',
				onUpdate: self => {
					xTransitionTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		xTransitionTl.to(xLineRef.current, {
			stroke: '#fff',
		})

		const yTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: 'top top-=2200px',
				end: '+=1px',
				onUpdate: self => {
					yTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		yTl.fromTo(
			yLineRef.current,
			{ drawSVG: '100% 100%' },
			{ drawSVG: '0% 100%', delay: 1 }
		)
		const yTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top center',
				end: '+=100px',
				onUpdate: self => {
					yTransitionTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		yTransitionTl.to(yLineRef.current, {
			stroke: '#fff',
		})

		// Points Animation
		if (points.length > 0) {
			const pointTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter2',
					start: 'top top-=2200px',
					end: '+=1px',
					onUpdate: self => {
						pointTl.reversed(self.direction > 0 ? false : true)
					},
				},
			})
			pointTl.to(`.${styles.point}`, {
				ease: 'elastic',
				autoAlpha: 1,
				r: 10,
				delay: 1,
				stagger: (i, el) => {
					gsap.to(el, {
						fill: `rgb(${(123 / points.length) * i}, 0, ${
							128 + (127 / points.length) * i
						})`,
						// fill: `hsl(${i * (360 / points.length)} 100% 50%)`,
					})
					return 0.05 * i
				},
			})

			setBestLinePath(lineOfBestFit(points, [0, 0, svgWidth, svgHeight]))
		}

		// Best fit animation
		const bestFitTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: 'top top-=2200px',
				end: '+=1px',
				onUpdate: self => {
					bestFitTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		bestFitTl.fromTo(
			bestFitRef.current,
			{ drawSVG: '0% 0%' },
			{ drawSVG: '0% 100%', delay: 2 }
		)
	}, [points])

	return (
		<div className={styles.scatter}>
			<svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
				<path
					ref={xLineRef}
					d={xLinePath}
					className={styles.xLine}></path>
				<path
					ref={yLineRef}
					d={yLinePath}
					className={styles.yLine}></path>
				<defs>
					<mask id='bestFitMask'>
						<path
							ref={bestFitRef}
							d={bestLinePath}
							className={styles.best}
						/>
					</mask>
				</defs>
				<path
					mask='url(#bestFitMask)'
					d={bestLinePath}
					className={styles.bestDashed}
				/>
				<g className={styles.points}>
					{points.map((point, i) => {
						return (
							<circle
								key={`scatter-point-${i}`}
								className={styles.point}
								r={0}
								cx={point.x}
								cy={point.y}
							/>
						)
					})}
				</g>
			</svg>
		</div>
	)
}

export default Scatter
