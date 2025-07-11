import { FC, CSSProperties } from 'react'
import Wave from 'react-wavify'
import { AnimatePresence, motion, useInView } from 'motion/react'

import ProjectCard from '../../ProjectBanner'

import { projectList } from '@/app/data'

import styles from './Mercury.module.scss'
import { cn } from '@/utils/react'

interface MercuryCardProps {}

const Drop = () => {
	const props: CSSProperties = {}

	return (
		<motion.div
			className={styles.drop}
			style={{ ...props }}
			transition={{
				type: 'keyframes',
				duration: 10,
				ease: [0, 0, 0, 1],
				repeat: Infinity,
			}}
			animate={{
				bottom: ['100%', '-100%'],
			}}
			exit={{ bottom: '-100%' }}></motion.div>
	)
}

interface DropsProps {
	drops: number
}
const Drops = () => {
	return (
		<AnimatePresence>
			<motion.div className={styles.drops}>
				<Drop />
			</motion.div>
		</AnimatePresence>
	)
}

const MercuryCard: FC<MercuryCardProps> = ({}) => {
	const { mercury: data } = projectList
	return (
		<ProjectCard className={styles.project} projectName='Mercury'>
			<h1 className={styles.title}>{data.name}</h1>
			<div className={styles.background}>
				<Wave
					className={cn(styles.wave, styles.top)}
					paused={false}
					style={{ display: 'flex' }}
					options={{
						height: 10,
						amplitude: 15,
						speed: 0.15,
						points: 4,
					}}
				/>
				<Drops />

				<Wave
					className={cn(styles.wave, styles.bottom)}
					paused={false}
					style={{ display: 'flex' }}
					options={{
						height: 10,
						amplitude: 25,
						speed: 0.15,
						points: 3,
					}}
				/>
			</div>
		</ProjectCard>
	)
}

export default MercuryCard
