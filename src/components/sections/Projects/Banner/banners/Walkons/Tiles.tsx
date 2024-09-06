import React, { CSSProperties, FC, ReactElement } from 'react'
import Image from 'next/image'
import { cn } from '@/utils/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBaseballBatBall,
	faBasketball,
	faBeerMug,
	faBurgerLettuce,
	faFootball,
	faTrophyStar,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import styles from './WalkOns.module.scss'

interface TileProps {}

const Tiles: FC<TileProps> = () => {
	return (
		<div className={styles.tiles}>
			{tiles.map((column, ci) => {
				return (
					<div
						key={ci}
						className={cn(styles.column, styles[`column${ci}`])}>
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

export default Tiles

// Tile Data

const red = '#e31f2e'
const yellow = '#f1a043'
const blue = '#03055e'

interface Tile {
	backgroundColor: CSSProperties['backgroundColor']
	icon?: ReactElement | ReactElement[]
	image?: ReactElement
}

const column0: Tile[] = [
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
const column1: Tile[] = [
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
const column2: Tile[] = [
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

const tiles: Tile[][] = [column0, column1, column2]
