import { RefObject, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import {
	faBinary,
	faComputerClassic,
	faDatabase,
	faSatellite,
	faServer,
	faTabletScreenButton,
	faTowerBroadcast,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'

import { cn } from '@/utils/react'
import { Coord } from '@/utils/general'

import styles from './Network.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin)

interface Node extends Coord {
	className: string
	icon: FontAwesomeIconProps['icon']
	order: number
	binaryRef: GSAPTimeline | null
}

const Network = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	const lightPathRef = useRef<SVGPathElement>(null)
	const pcServerPathRef = useRef<SVGPathElement>(null)
	const serverDataPathRef = useRef<SVGPathElement>(null)
	const serverTabletPathRef = useRef<SVGPathElement>(null)

	const { contextSafe } = useGSAP({
		dependencies: [],
	})

	const makeBinaryPath = contextSafe(
		(
			pathRef: RefObject<SVGPathElement>,
			className: string,
			opts: { duration?: number; delay?: number } = {
				duration: 1,
				delay: 0,
			}
		) => {
			if (pathRef.current) {
				const binaryDataTl = gsap.timeline({
					paused: true,
					repeat: -1,
					delay: opts.delay,
				})

				binaryDataTl.to(className, {
					duration: opts.duration,
					ease: 'none',
					motionPath: {
						path: pathRef.current,
						align: pathRef.current,
						alignOrigin: [0.5, 0.5],
					},
				})
				binaryDataTl.to(
					className,
					{
						duration: 0.1,
						autoAlpha: 1,
					},
					'<'
				)
				return binaryDataTl
			}
		}
	)

	// Light to computer
	const binary1Tl = useRef<GSAPTimeline | null>(null)
	const binary2Tl = useRef<GSAPTimeline | null>(null)
	const binary3Tl = useRef<GSAPTimeline | null>(null)
	const binary4Tl = useRef<GSAPTimeline | null>(null)

	const [svgDimensions, setSvgDimensions] = useState<[number, number]>([
		500, 100,
	])

	// const showNode = contextSafe(
	// 	(
	// 		className: string | string[],
	// 		offset: number,
	// 		duration: number,
	// 		binaryTl: GSAPTimeline | null
	// 	) => {
	// 		const nodeTl = gsap.timeline({
	// 			scrollTrigger: {
	// 				trigger: '.chapter5',
	// 				start: `top top-=${offset}`,
	// 				end: `+=${duration}px`,
	// 				scrub: true,
	// 				onUpdate: self => {
	// 					if (binaryTl) {
	// 						if (self.direction > 0 && self.progress >= 0.95) {
	// 							binaryTl.play()
	// 						} else {
	// 							binaryTl.pause(0)
	// 						}
	// 					}
	// 				},
	// 			},
	// 		})
	// 		nodeTl.to(className, {
	// 			autoAlpha: 1,
	// 			duration: 0.1,
	// 		})
	// 		nodeTl.to(className, {
	// 			boxShadow:
	// 				'inset 5px 5px 10px #140025, inset -5px -5px 10px #500093',
	// 			duration: 1,
	// 		})
	// 		nodeTl.to(
	// 			`${className} .${styles.icon}`,
	// 			{
	// 				autoAlpha: 1,
	// 				delay: 0.2,
	// 				duration: 1,
	// 			},
	// 			'<'
	// 		)
	// 		return nodeTl
	// 	}
	// )

	function scaleDimensions(x: number, y: number): [number, number] {
		const cx = (x / 100) * svgDimensions[0]
		const cy = (y / 100) * svgDimensions[1]
		return [cx, cy]
	}
	function pointsToPath(points: Node[], curviness = 0) {
		const pathString = MotionPathPlugin.rawPathToString(
			MotionPathPlugin.arrayToRawPath(
				points.map(p => {
					const [x, y] = scaleDimensions(p.x, p.y)
					return { x, y: y - y * 0.07 }
				}),
				{ curviness }
			)
		)

		return pathString
	}

	const ground = 65
	const nodes: { [node: string]: Node } = {
		computer: {
			x: 50,
			y: ground,
			order: 1,
			className: styles.computer,
			icon: faComputerClassic,
			binaryRef: binary1Tl.current,
		},
		server: {
			x: 65,
			y: ground,
			order: 2,
			className: styles.server,
			icon: faServer,
			binaryRef: binary2Tl.current,
		},
		database: {
			x: 80,
			y: ground,
			order: 3,
			className: styles.database,
			icon: faDatabase,
			binaryRef: binary3Tl.current,
		},
		tower: {
			x: 65,
			y: ground - 30,
			order: 4,
			className: styles.tower,
			icon: faTowerBroadcast,
			binaryRef: null,
		},
		satellite: {
			x: 15,
			y: 15,
			order: 5,
			className: styles.satellite,
			icon: faSatellite,
			binaryRef: null,
		},
		tablet: {
			x: 15,
			y: ground,
			order: 6,
			className: styles.tablet,
			icon: faTabletScreenButton,
			binaryRef: binary4Tl.current,
		},
	}

	useGSAP(() => {
		//
		if (containerRef.current) {
			const rect = containerRef.current?.getBoundingClientRect()
			setSvgDimensions([rect.width, rect.height])
		}
		const sortedNodes = Object.values(nodes).sort(
			(a, b) => a.order - b.order
		)
		const nodeClasses = sortedNodes.map(node => {
			gsap.set(`.${node.className}`, {
				top: `${node.y}%`,
				left: `${node.x}%`,
			})

			return `.${node.className}`
		})

		// Add background behind lightbulb
		const lightNodeTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top top',
				end: '+=300px',
				fastScrollEnd: true,
				toggleActions: 'play complete none reverse',
				onUpdate: self => {
					lightNodeTl
						.timeScale(self.direction > 0 ? 1 : 5)
						.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		lightNodeTl.to('.lightContainer', {
			duration: 1,
			background: 'linear-gradient(60deg, #07727a 0%, #9600c0 80%)',
			boxShadow: '4px 4px 8px 0px #0008',
		})

		//! dream, ref doesnt work as is, change how its passed?
		// for (let i = 0; i < sortedNodes.length; i++) {
		// const node = sortedNodes[i]
		// 	showNode(
		// 		`.${node.className}`,
		// 		750 + i * 400,
		// 		400,
		// 		node.binaryRef
		// 	)
		// }

		const nodeDuration = 600

		// Light to computer
		const path1 = makeBinaryPath(lightPathRef, `.${styles.lightBinary}`)
		if (path1) binary1Tl.current = path1
		const node1Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: `top top-=${750}`,
				end: `+=${nodeDuration}px`,
				scrub: true,
				toggleActions: 'play none none revert',
				preventOverlaps: 'nodes',
				// fastScrollEnd: true,
				onUpdate: self => {
					if (binary1Tl.current) {
						if (self.direction > 0 && self.progress >= 0.95) {
							binary1Tl.current.play()
						} else {
							binary1Tl.current.pause(0)
						}
					}
				},
			},
		})
		node1Tl.to(nodeClasses[0], {
			autoAlpha: 1,
			duration: 0.1,
		})
		node1Tl.to(nodeClasses[0], {
			backgroundColor: '#32005cff',
			boxShadow:
				'inset 5px 5px 10px #140025, inset -5px -5px 10px #500093',
			duration: 1,
		})
		node1Tl.to(
			`${nodeClasses[0]} .${styles.icon}`,
			{
				autoAlpha: 1,
				delay: 0.2,
				duration: 1,
			},
			'<'
		)

		// Computer to server
		const path2 = makeBinaryPath(
			pcServerPathRef,
			`.${styles.computerBinary}`
		)
		if (path2) binary2Tl.current = path2
		const node2Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: `top top-=${1150}`,
				end: `+=${nodeDuration}px`,
				scrub: true,
				toggleActions: 'play none none revert',
				preventOverlaps: 'nodes',
				// fastScrollEnd: true,
				onUpdate: self => {
					if (binary2Tl.current) {
						if (self.direction > 0 && self.progress >= 0.95) {
							binary2Tl.current.play()
						} else {
							binary2Tl.current.pause(0)
						}
					}
				},
			},
		})
		node2Tl.to(nodeClasses[1], {
			autoAlpha: 1,
			duration: 0.1,
		})
		node2Tl.to(nodeClasses[1], {
			backgroundColor: '#32005cff',
			boxShadow:
				'inset 5px 5px 10px #140025, inset -5px -5px 10px #500093',
			duration: 1,
		})
		node2Tl.to(
			`${nodeClasses[1]} .${styles.icon}`,
			{
				autoAlpha: 1,
				delay: 0.2,
				duration: 1,
			},
			'<'
		)
		// Server to database
		const path3 = makeBinaryPath(serverDataPathRef, `.${styles.dataBinary}`)
		if (path3) binary3Tl.current = path3
		const node3Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: `top top-=${1550}`,
				end: `+=${nodeDuration}px`,
				scrub: true,
				toggleActions: 'play none none revert',
				preventOverlaps: 'nodes',
				// fastScrollEnd: true,
				onUpdate: self => {
					if (binary3Tl.current) {
						if (self.direction > 0 && self.progress >= 0.95) {
							binary3Tl.current.play()
						} else {
							binary3Tl.current.pause(0)
						}
					}
				},
			},
		})
		node3Tl.to(nodeClasses[2], {
			autoAlpha: 1,
			duration: 0.1,
		})
		node3Tl.to(nodeClasses[2], {
			backgroundColor: '#32005cff',
			boxShadow:
				'inset 5px 5px 10px #140025, inset -5px -5px 10px #500093',
			duration: 1,
		})
		node3Tl.to(
			`${nodeClasses[2]} .${styles.icon}`,
			{
				autoAlpha: 1,
				delay: 0.2,
				duration: 1,
			},
			'<'
		)
		// Server to tower
		const node4Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: `top top-=${1950}`,
				end: `+=${nodeDuration}px`,
				scrub: true,
				toggleActions: 'play none none revert',
				preventOverlaps: 'nodes',
				// fastScrollEnd: true,
			},
		})
		node4Tl.to(nodeClasses[3], {
			autoAlpha: 1,
			duration: 0.1,
		})
		node4Tl.to(nodeClasses[3], {
			backgroundColor: '#32005cff',
			boxShadow:
				'inset 5px 5px 10px #140025, inset -5px -5px 10px #500093',
			duration: 1,
		})
		node4Tl.to(
			`${nodeClasses[3]} .${styles.icon}`,
			{
				autoAlpha: 1,
				delay: 0.2,
				duration: 1,
			},
			'<'
		)

		// Server to tablet path
		const path4 = makeBinaryPath(
			serverTabletPathRef,
			`.${styles.tabletBinary1}`,
			{
				duration: 3,
			}
		)
		if (path4) binary4Tl.current = path4
		// Tower to satellite
		const node5Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: `top top-=${2150}`,
				end: `+=${nodeDuration}px`,
				scrub: true,
				toggleActions: 'play none none revert',
				preventOverlaps: 'nodes',
				// fastScrollEnd: true,
			},
		})
		node5Tl.to(nodeClasses[4], {
			autoAlpha: 1,
			duration: 0.1,
		})
		node5Tl.to(nodeClasses[4], {
			backgroundColor: '#32005cff',
			boxShadow:
				'inset 5px 5px 10px #140025, inset -5px -5px 10px #500093',
			duration: 1,
		})
		node5Tl.to(
			`${nodeClasses[4]} .${styles.icon}`,
			{
				autoAlpha: 1,
				delay: 0.2,
				duration: 1,
			},
			'<'
		)
		// Satellite to tablet
		const node6Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: `top top-=${2350}`,
				end: `+=${nodeDuration}px`,
				scrub: true,
				toggleActions: 'play none none revert',
				preventOverlaps: 'nodes',
				// fastScrollEnd: true,
				onUpdate: self => {
					if (binary4Tl.current) {
						if (self.direction > 0 && self.progress >= 0.95) {
							binary4Tl.current.play()
						} else {
							binary4Tl.current.pause(0)
						}
					}
				},
			},
		})
		node6Tl.to(nodeClasses[5], {
			autoAlpha: 1,
			duration: 0.1,
		})
		node6Tl.to(nodeClasses[5], {
			backgroundColor: '#32005cff',
			boxShadow:
				'inset 5px 5px 10px #140025, inset -5px -5px 10px #500093',
			duration: 1,
		})
		node6Tl.to(
			`${nodeClasses[5]} .${styles.icon}`,
			{
				autoAlpha: 1,
				delay: 0.2,
				duration: 1,
			},
			'<'
		)
	}, [])

	return (
		<div ref={containerRef} className={styles.container}>
			<FontAwesomeIcon
				className={cn(styles.data, styles.lightBinary)}
				icon={faBinary}
			/>
			<FontAwesomeIcon
				className={cn(styles.data, styles.computerBinary)}
				icon={faBinary}
			/>
			<FontAwesomeIcon
				className={cn(styles.data, styles.dataBinary)}
				icon={faBinary}
			/>
			<>
				<FontAwesomeIcon
					className={cn(styles.data, styles.tabletBinary1)}
					icon={faBinary}
				/>
				<FontAwesomeIcon
					className={cn(styles.data, styles.tabletBinary2)}
					icon={faBinary}
				/>
				<FontAwesomeIcon
					className={cn(styles.data, styles.tabletBinary3)}
					icon={faBinary}
				/>
			</>

			<svg
				viewBox={`0 0 ${svgDimensions[0]} ${svgDimensions[1]}`}
				className={styles.svg}>
				<path
					ref={lightPathRef}
					className={cn(styles.line, styles.lightPc)}
					d={pointsToPath([
						{
							x: 50,
							y: 90,
							className: '',
							order: 0,
							icon: faServer,
							binaryRef: null,
						},
						nodes.computer,
					])}
				/>

				<path
					ref={pcServerPathRef}
					className={cn(styles.line, styles.pcServer)}
					d={pointsToPath([nodes.computer, nodes.server])}
				/>
				<path
					ref={serverDataPathRef}
					className={cn(styles.line, styles.serverDatabase)}
					d={pointsToPath([nodes.server, nodes.database])}
				/>
				<path
					ref={serverTabletPathRef}
					className={cn(styles.line, styles.serverTablet)}
					d={pointsToPath(
						[
							nodes.server,
							nodes.tower,
							nodes.satellite,
							nodes.tablet,
						],
						0
					)}
				/>
			</svg>

			{Object.values(nodes)
				.sort((a, b) => a.order - b.order)
				.map((node, i) => {
					return (
						<div
							key={`network-node-${i}`}
							className={cn(styles.node, node.className)}>
							<FontAwesomeIcon
								className={styles.icon}
								icon={node.icon}
							/>
						</div>
					)
				})}
		</div>
	)
}

export default Network
