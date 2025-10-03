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
	binaryRef?: RefObject<GSAPTimeline | null>
}

const Network = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	const lightPathRef = useRef<SVGPathElement>(null)
	const pcServerPathRef = useRef<SVGPathElement>(null)
	const serverDataPathRef = useRef<SVGPathElement>(null)
	const serverTabletPathRef = useRef<SVGPathElement>(null)

	const binary1TlRef = useRef<GSAPTimeline | null>(null)
	const binary2TlRef = useRef<GSAPTimeline | null>(null)
	const binary3TlRef = useRef<GSAPTimeline | null>(null)
	const binary4TlRef = useRef<GSAPTimeline | null>(null)

	const [svgDimensions, setSvgDimensions] = useState<[number, number]>([
		500, 100,
	])
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

	const { contextSafe } = useGSAP({
		dependencies: [],
	})

	const showNode = contextSafe(
		(
			className: string | string[],
			offset: number,
			duration: number,
			binaryTlRef?: RefObject<GSAPTimeline | null>
		) => {
			const nodeTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter5',
					start: `top top-=${offset}`,
					end: `+=${duration}px`,
					scrub: true,
				},
				onUpdate: self => {
					console.log(binaryTlRef?.current)
					if (binaryTlRef?.current) {
						console.log(self.progress)
						if (self.direction > 0 && self.progress >= 0.95) {
							binaryTlRef.current.play()
						} else {
							binaryTlRef.current.pause(0)
						}
					}
				},
			})
			nodeTl.to(className, {
				autoAlpha: 1,
				duration: 0.1,
			})
			nodeTl.to(className, {
				boxShadow:
					'inset 5px 5px 10px #140025, inset -5px -5px 10px #500093',
				duration: 1,
			})
			nodeTl.to(
				`${className} .${styles.icon}`,
				{
					autoAlpha: 1,
					delay: 0.2,
					duration: 1,
				},
				'<'
			)
			return nodeTl
		}
	)

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
					// scrollTrigger: {
					// 	trigger: '.chapter5',
					// 	start: 'top top',
					// 	onUpdate: self => {
					// 		if (!(self.direction > 0)) {
					// 			binaryDataTl.restart(true)
					// 		}
					// 		binaryDataTl.reversed(
					// 			self.direction > 0 ? false : true
					// 		)
					// 	},
					// },
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

	const ground = 65
	const nodes: { [node: string]: Node } = {
		computer: {
			x: 50,
			y: ground,
			order: 1,
			className: styles.computer,
			icon: faComputerClassic,
			binaryRef: binary1TlRef,
		},
		server: {
			x: 65,
			y: ground,
			order: 2,
			className: styles.server,
			icon: faServer,
			binaryRef: binary2TlRef,
		},
		database: {
			x: 80,
			y: ground,
			order: 3,
			className: styles.database,
			icon: faDatabase,
			binaryRef: binary3TlRef,
		},
		tower: {
			x: 65,
			y: ground - 30,
			order: 4,
			className: styles.tower,
			icon: faTowerBroadcast,
		},
		satellite: {
			x: 15,
			y: 15,
			order: 5,
			className: styles.satellite,
			icon: faSatellite,
		},
		tablet: {
			x: 15,
			y: ground,
			order: 6,
			className: styles.tablet,
			icon: faTabletScreenButton,
			binaryRef: binary4TlRef,
		},
	}

	useGSAP(() => {
		// Light to computer
		const path1 = makeBinaryPath(lightPathRef, `.${styles.lightBinary}`)
		if (path1) {
			binary1TlRef.current = path1
		}
		// Computer to server
		const path2 = makeBinaryPath(
			pcServerPathRef,
			`.${styles.computerBinary}`
		)
		if (path2) {
			binary2TlRef.current = path2
		}
		// Server to database
		const path3 = makeBinaryPath(serverDataPathRef, `.${styles.dataBinary}`)
		if (path3) {
			binary3TlRef.current = path3
		}
		// Server to tablet
		const path4 = makeBinaryPath(
			serverTabletPathRef,
			`.${styles.tabletBinary1}`,
			{
				duration: 3,
			}
		)
		if (path4) {
			binary4TlRef.current = path4
		}

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

		const nodeTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top top-=999px',
				end: '+=1px',
				onUpdate: self => {
					nodeTl.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		nodeTl.to(`.${styles.node}`, {
			autoAlpha: 1,
			duration: 0.1,
			stagger: 0,
		})

		const lightNodeTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top top',
				end: '+=1px',

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

		const networkTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter5',
				start: 'top top-=1000px',

				end: '+=1750px',
				// scrub: true,
			},
		})

		for (let i = 0; i < nodeClasses.length; i++) {
			const node = nodeClasses[i]
			networkTl.add(showNode(node, 750 + i * 400, 400))
		}

		// const delay = 400
		// // Show computer
		// networkTl.add(showNode(nodeClasses[0], 750, 400))

		// // Show server
		// networkTl.add(showNode(nodeClasses[1], 1500, delay))

		// // Show Database
		// networkTl.add(showNode(nodeClasses[2], 2000, delay))

		// // Show tower
		// networkTl.add(showNode(nodeClasses[3], 2500, delay))
		// // Show satellite
		// networkTl.add(showNode(nodeClasses[4], 3000, delay))
		// // Show tablet
		// networkTl.add(showNode(nodeClasses[5], 3500, delay))

		const path5 = makeBinaryPath(
			serverTabletPathRef,
			`.${styles.tabletBinary2}`,
			{
				duration: 3,
				delay: 1,
			}
		)
		if (path5) networkTl.add(path5)
		const path6 = makeBinaryPath(
			serverTabletPathRef,
			`.${styles.tabletBinary3}`,
			{
				duration: 3,
				delay: 2,
			}
		)
		if (path6) networkTl.add(path6)
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
