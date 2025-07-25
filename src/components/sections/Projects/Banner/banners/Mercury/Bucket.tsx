import { FC } from 'react'

import { Project } from '@/app/data/project-list'
import { cn } from '@/utils/react'

import styles from './Bucket.module.scss'
import Wave from 'react-wavify'
import { motion, stagger, Variants } from 'motion/react'
interface BucketProps {
	/** Text to display inside of the bucket. Pass an array of strings to display multiple lines */
	text: Project['description'][number]
	/** The Bucket Component comes wih default styling. Use this prop to override or add additional styling. */
	className?: string

	/** Delay, in seconds, before starting the fill animation */
	delay?: number
	/** Duration, in seconds, of fill animation */
	duration?: number
}

const Bucket: FC<BucketProps> = ({
	text: content,
	className,
	delay = 0,
	duration = 3,
}) => {
	if (typeof content === 'undefined') return null
	content = typeof content === 'string' ? [content] : content

	const background: Variants = {
		hidden: {
			height: 0,
			transform: 'translateY(20px)',
		},
		show: {
			height: '100%',
			transform: 'translateY(0px)',
			transition: { duration, delay },
		},
	}
	const fade: Variants = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			transition: { delay },
		},
	}

	return (
		<motion.div
			className={cn(
				styles.bucket,
				className !== undefined ? styles[className] : undefined
			)}>
			{content.map(line => (
				<motion.p
					variants={fade}
					key={Math.random()}
					className={styles.line}>
					{line}
				</motion.p>
			))}
			<div className={styles.background}>
				<motion.div variants={background} className={styles.fill}>
					<Wave
						className={styles.top}
						paused={false}
						options={{
							height: 10,
							amplitude: 10,
							speed: 0.18,
							points: 4,
						}}
					/>
				</motion.div>
			</div>
			<motion.div variants={fade} className={styles.nib}></motion.div>
		</motion.div>
	)
}

export default Bucket
