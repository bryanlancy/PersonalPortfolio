'use client'

import React, { FC } from 'react'

import styles from './WalkOns.module.scss'
import { AnimatePresence, motion } from 'motion/react'

interface DescriptionCardProps {
	paragraphs: string[]
	animProgress: number
}

const DescriptionCard: FC<DescriptionCardProps> = ({
	paragraphs,
	animProgress,
}) => {
	const enter = 0.01
	const exit = 0.95

	return (
		<AnimatePresence>
			{animProgress >= enter && animProgress <= exit && (
				<motion.div
					key='descriptionCard'
					initial={{ transform: 'translateX(-150%)', opacity: 0 }}
					animate={{ transform: 'translateX(0%)', opacity: 1 }}
					exit={{ transform: 'translateX(-150%)', opacity: 0 }}
					transition={{
						type: 'spring',
						stiffness: 120,
					}}
					className={styles.card}>
					<div className={styles.color}></div>
					<div className={styles.text}>
						{paragraphs.map((paragraph, i) => {
							return <p key={i}>{paragraph}</p>
						})}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default DescriptionCard
