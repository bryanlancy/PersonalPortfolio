import React, { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { mapRange } from '@/utils/general'
import WalkOnsLogo from './Logo'

import styles from './WalkOns.module.scss'

interface BackgroundProps {
	animProgress: number
}

const Background: FC<BackgroundProps> = ({ animProgress }) => {
	// const variants
	const overLayInitA = 0.25
	const overLayEndA = 0.9

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: mapRange(animProgress, 0, 0.1, 0, 1) }}
				className={styles.imageBackground}>
				<motion.div
					initial={{ opacity: overLayInitA }}
					animate={{
						opacity: mapRange(
							animProgress,
							0,
							1,
							overLayInitA,
							overLayEndA
						),
					}}
					className={styles.overlay}></motion.div>
				<Image
					src='/assets/walkons/walkons.jpg'
					alt='walkons restaurant'
					priority
					width={800}
					height={500}
					className={styles.image}
				/>
			</motion.div>
			<div className={styles.colorBackground}></div>
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: mapRange(animProgress, 0, 0.4, 0, 1),
				}}>
				<WalkOnsLogo />
			</motion.div>
		</>
	)
}

export default Background
