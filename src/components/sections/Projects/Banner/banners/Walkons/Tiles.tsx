import { CSSProperties, ReactElement } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBaseballBatBall,
	faBasketball,
	faBeerMug,
	faBurgerLettuce,
	faFootball,
	faTrophyStar,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import { cn } from '@/utils/react'

import styles from './Tiles.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Tiles() {
	useGSAP(() => {
		const step1 = 50
		const step2 = 45
		const duration1 = 0.5
		const duration2 = 5
		const length = 1200

		// Start at y:100%, jump to on screen, continue to scroll to y:-100%
		const oddTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.walkons',
				start: 'top center-=100px',
				end: `+=${length}px`,
				toggleActions: 'play none resume reverse',
				scrub: true,
			},
		})
		oddTl.to(`.${styles.odd}`, {
			autoAlpha: 1,
			y: `${step1}%`,
			duration: duration1,
		})
		oddTl.to(`.${styles.odd}`, {
			y: `-${step2}%`,
			duration: duration2,
		})

		// Start at y:-100%, jump to on screen, continue to scroll to y:100%
		const evenTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.walkons',
				start: 'top center-=100px',
				end: `+=${length}px`,
				toggleActions: 'play none resume reverse',
				scrub: true,
			},
		})
		evenTl.to(`.${styles.even}`, {
			autoAlpha: 1,
			y: `-${step1}%`,
			duration: duration1,
		})
		evenTl.to(`.${styles.even}`, {
			y: `${step2}%`,
			duration: duration2,
		})
	}, [])

	return (
		<div className={styles.tiles}>
			{tiles.map((column, ci) => {
				const isEvenColumn = ci % 2 == 0
				return (
					<div
						key={ci}
						className={cn(styles.column, styles[`column${ci}`], [
							isEvenColumn,
							styles.even,
							styles.odd,
						])}>
						{column.map((tile, ti) => {
							const { backgroundColor, image, icon } = tile
							return (
								<div
									key={ti}
									className={styles.tile}
									style={{ backgroundColor }}>
									{image}
									{icon}
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

// Tile Data

const red = '#e31f2e'
const yellow = '#f1a043'
const blue = '#03055e'

interface Tile {
	backgroundColor: CSSProperties['backgroundColor']
	icon?: ReactElement | ReactElement[]
	image?: ReactElement
}
type Column = Tile[]
const column0: Column = [
	{
		backgroundColor: red,
		icon: <FontAwesomeIcon icon={faBaseballBatBall} />,
	},
	{
		backgroundColor: yellow,
		image: (
			<Image
				src='/assets/walkons/burger.jpeg'
				alt='burger'
				width={144}
				height={96}
			/>
		),
	},
	{ backgroundColor: blue, icon: <FontAwesomeIcon icon={faBasketball} /> },
	{
		backgroundColor: red,
		image: (
			<Image
				src='/assets/walkons/poboy.jpeg'
				alt='poboy'
				width={160}
				height={96}
			/>
		),
	},
]
const column1: Column = [
	{ backgroundColor: blue, icon: <FontAwesomeIcon icon={faBurgerLettuce} /> },
	{
		backgroundColor: red,
		image: (
			<Image
				src='/assets/walkons/tacos.jpeg'
				alt='tacos'
				width={192}
				height={128}
			/>
		),
	},
	{ backgroundColor: yellow, icon: <FontAwesomeIcon icon={faBeerMug} /> },
]
const column2: Column = [
	{ backgroundColor: yellow, icon: <FontAwesomeIcon icon={faTrophyStar} /> },
	{
		backgroundColor: yellow,
		image: (
			<Image
				src='/assets/walkons/cocktail.jpeg'
				alt='cocktail'
				width={72}
				height={108}
			/>
		),
	},
	{ backgroundColor: red, icon: <FontAwesomeIcon icon={faFootball} /> },
	{
		backgroundColor: blue,
		image: (
			<Image
				src='/assets/walkons/bar.jpg'
				alt='tacos'
				width={192}
				height={128}
			/>
		),
	},
]

const tiles: Column[] = [column0, column1, column2]
