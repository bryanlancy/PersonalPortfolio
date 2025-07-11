import React, { FC } from 'react'
import styles from '../WalkOns.module.scss'
import { FootballSVG, PostThrowSVG, PreThrowSVG } from './SVGs'
import { cn } from '@/utils/react'
import { AnimatePresence, motion } from 'motion/react'

type QuarterbackProps = {
	animProgress: number
}

const QuarterBack: FC<QuarterbackProps> = ({ animProgress }) => {
	const preEnter = 0.01
	const preExit = 0.48

	const postEnter = preExit + 0.01
	const postExit = 0.96

	const throwEnter = {
		transform: 'translateX(0px)',
		opacity: 1,
	}
	const throwExit = {
		transform: 'translateX(150px)',
		opacity: 0,
	}

	const ballEnter = {
		transform: 'translateX(0px)',
		opacity: 1,
	}
	const ballExit = {
		transform: 'translateX(250px)',
		opacity: 0,
	}

	return (
		<div className={styles.quarterback}>
			<AnimatePresence>
				{animProgress >= preEnter && animProgress <= preExit && (
					<motion.div
						key='preThrow'
						initial={throwExit}
						animate={throwEnter}
						exit={throwExit}>
						<PreThrowSVG
							className={cn(styles.svg, styles.svgPre)}
						/>
					</motion.div>
				)}

				{animProgress >= postEnter && animProgress <= postExit && (
					<motion.div
						key='postthrow'
						initial={throwExit}
						animate={throwEnter}
						exit={throwExit}>
						<PostThrowSVG
							className={cn(styles.svg, styles.svgPost)}
						/>
					</motion.div>
				)}
				{animProgress >= postEnter && animProgress <= postExit && (
					<motion.div
						key='football'
						initial={ballExit}
						animate={ballEnter}
						exit={ballExit}
						className={styles.footballContainer}>
						<FootballSVG
							className={cn(styles.svg, styles.svgFootball)}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default QuarterBack
