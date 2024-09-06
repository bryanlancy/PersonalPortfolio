import React, { FC } from 'react'
import styles from '../WalkOns.module.scss'
import { FootballSVG, PostThrowSVG, PreThrowSVG } from './SVGs'
import { cn } from '@/utils/react'

type QuarterbackProps = {}

const QuarterBack: FC<QuarterbackProps> = () => {
	return (
		<div className={styles.quarterback}>
			<PreThrowSVG className={cn(styles.svg, styles.svgPre)} />

			<PostThrowSVG className={cn(styles.svg, styles.svgPost)} />
			<div className={styles.footballContainer}>
				<FootballSVG className={cn(styles.svg, styles.svgFootball)} />
			</div>
		</div>
	)
}

export default QuarterBack
