import React, { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarStoolsSVG, BarSVG } from './Quarterback/SVGs'

import styles from './WalkOns.module.scss'

interface BorderProps {
	animProgress: number
}

// TODO Fix bar and barstool svgs, need to scale horizontally

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
						className={styles.barBackground}></motion.div>
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
						{/* {stools.map((num, i) => {
                            return <BarStoolSVG key={i} className={styles.svgStool} />
                        })} */}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default Border
