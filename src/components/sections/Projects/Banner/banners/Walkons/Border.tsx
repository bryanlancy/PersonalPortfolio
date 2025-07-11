import React, { FC } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BarStoolsSVG, BarSVG } from './Quarterback/SVGs'

import styles from './WalkOns.module.scss'
import { cn } from '@/utils/react'

interface BorderProps {
	animProgress: number
}

const Border: FC<BorderProps> = ({ animProgress }) => {
	const enter = 0.01

	return (
		<AnimatePresence>
			{animProgress >= enter && (
				<>
					<motion.div
						key='barBackground'
						initial={{ transform: 'translateY(150%)' }}
						animate={{ transform: 'translateY(0%)' }}
						exit={{ transform: 'translateY(150%)' }}
						className={styles.barBackground}>
						<motion.div
							key='capContainer'
							initial={{ transform: 'translate(-50%, 150%)' }}
							animate={{ transform: 'translate(-50%, 0%)' }}
							exit={{ transform: 'translate(-50%, 150%)' }}
							transition={{ delay: 0.1 }}
							className={styles.capContainer}>
							<motion.div
								key='barCapLeft'
								className={cn(
									styles.barCap,
									styles.left
								)}></motion.div>
							<motion.div
								key='barCapRight'
								className={cn(
									styles.barCap,
									styles.right
								)}></motion.div>
						</motion.div>
					</motion.div>
					<motion.div
						key='bar'
						initial={{ transform: 'translateY(150%)' }}
						animate={{ transform: 'translateY(0%)' }}
						exit={{ transform: 'translateY(150%)' }}
						transition={{ delay: 0.1 }}
						className={styles.bar}>
						<BarSVG className={styles.svgBar} />
					</motion.div>
					<motion.div
						key='barStools'
						initial={{ transform: 'translateY(150%)' }}
						animate={{ transform: 'translateY(100%)' }}
						exit={{ transform: 'translateY(150%)' }}
						transition={{ delay: 0.2 }}
						className={styles.barStools}>
						<BarStoolsSVG className={styles.svgStools} />
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default Border
