import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Coord } from '@/utils/general'
import { generatePoints, lineOfBestFit, printPoint } from '@/utils/svg'
import styles from './Scatter.module.scss'
import { cn } from '@/utils/react'

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger)

const Scatter = () => {
	const svgWidth = 1000
	const svgHeight = 500
	const zeroPos: Coord = { x: svgWidth * 0.1, y: svgHeight * 0.1 }
	const xLinePath = `M ${zeroPos.x} ${svgHeight * 0.9} L ${svgWidth * 0.9} ${
		svgHeight * 0.9
	}`
	const yLinePath = `M ${printPoint(zeroPos)} L ${zeroPos.x} ${
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
		// Calculate best line path regardless of screen size
		if (points.length > 0) {
			setBestLinePath(lineOfBestFit(points, [0, 0, svgWidth, svgHeight]))
		}

		const mm = gsap.matchMedia()

		// Only show scatter chart on desktop and larger screens
		mm.add('(min-width: 1240px)', () => {
			const showScatterTl = gsap.timeline({
				defaults: { duration: 1, ease: 'sine.inOut' },
				scrollTrigger: {
					trigger: '.chapter2',
					start: 'top top-=2200px',
					end: '+=600px',
					fastScrollEnd: true,
					toggleActions: 'play none none reverse',
				},
			})
			showScatterTl.to(`.${styles.scatter}`, {
				duration: 0.3,
				autoAlpha: 1,
			})
		})

		// Keep scatter chart hidden on mobile, tablet, and laptop
		mm.add('(max-width: 1239px)', () => {
			gsap.set(`.${styles.scatter}`, {
				autoAlpha: 0,
			})
		})
		// Axis Lines Animations - only on desktop and larger
		mm.add('(min-width: 1240px)', () => {
			const xTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter2',
					start: 'top top-=2200px',
					end: '+=100px',
					fastScrollEnd: true,
					toggleActions: 'play complete none reverse',
				},
			})
			xTl.fromTo(
				xLineRef.current,
				{ drawSVG: '0% 0%' },
				{ drawSVG: '0% 100%', delay: 1 }
			)

			const yTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter2',
					start: 'top top-=2200px',
					end: '+=100px',
					fastScrollEnd: true,
					toggleActions: 'play complete none reverse',
				},
			})
			yTl.fromTo(
				yLineRef.current,
				{ drawSVG: '100% 100%' },
				{ drawSVG: '0% 100%', delay: 1 }
			)
		})
		// Line transition - only on desktop and larger
		mm.add('(min-width: 1240px)', () => {
			const lineTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: 'top center',
					end: '+=100px',
					fastScrollEnd: true,
					toggleActions: 'play complete none reverse',
				},
			})

			lineTransitionTl.to(
				[yLineRef.current, xLineRef.current, `.${styles.bestDashed}`],
				{
					stroke: '#fff',
				}
			)
		})

		// Points Animation - only on desktop and larger
		mm.add('(min-width: 1240px)', () => {
			if (points.length > 0) {
				const pointTl = gsap.timeline({
					scrollTrigger: {
						trigger: '.chapter2',
						start: 'top top-=2200px',
						end: '+=100px',
						fastScrollEnd: true,
						toggleActions: 'play complete none reverse',
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
			}

			// Best fit animation
			const bestFitTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter2',
					start: 'top top-=2200px',
					end: '+=100px',
					fastScrollEnd: true,
					toggleActions: 'play complete none reverse',
				},
			})
			bestFitTl.fromTo(
				bestFitRef.current,
				{ drawSVG: '0% 0%' },
				{ drawSVG: '0% 100%', delay: 2 }
			)

			const scatterTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: 'top center',
					end: '+=600px',
					fastScrollEnd: true,
					toggleActions: 'play complete none reverse',
				},
			})
			scatterTransitionTl.to(`.${styles.scatter}`, {
				ease: 'power1',
				y: '-20vh',
			})

			// Hide scatter chart when chapter4 overflow animation starts
			const scatterHideTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter4',
					start: 'top bottom+=1000px',
					end: '+=1300px',
					toggleActions: 'play complete none reverse',
					fastScrollEnd: true,
				},
			})
			scatterHideTl.to(`.${styles.scatter}`, {
				duration: 0.1,
				autoAlpha: 0,
			})
		})
	}, [points])

	return (
		<div className={cn(styles.scatter, 'scatter-chart')}>
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
