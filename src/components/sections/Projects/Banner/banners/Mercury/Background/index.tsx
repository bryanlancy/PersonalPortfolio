import { projectList } from '@/app/data'

import Wave from 'react-wavify'
import { motion } from 'motion/react'

import { cn } from '@/utils/react'
import Drops from './Drops'
import Container from '@/utils/components/Container'

import styles from './Background.module.scss'

const Background = () => {
	const { mercury: data } = projectList

	const numDrops = 3

	return (
		<>
			<motion.div className={styles.background}>
				<Wave
					className={cn(styles.wave, styles.top)}
					paused={false}
					options={{
						height: 10,
						amplitude: 15,
						speed: 0.15,
						points: 3,
					}}
				/>
				<Drops drops={numDrops} />
				<Wave
					className={cn(styles.wave, styles.bottom)}
					paused={false}
					options={{
						height: 10,
						amplitude: 25,
						speed: 0.18,
						points: 4,
					}}
				/>
				<Container>
					<h1 className={styles.title}>{data.name}</h1>
				</Container>

				{/* TODO Hide or fade bottom wave when  scrolled out of view*/}
				<Wave
					className={cn(styles.wave, styles.bottombottom)}
					paused={false}
					options={{
						height: 8,
						amplitude: 15,
						speed: 0.18,
						points: 4,
					}}
				/>
			</motion.div>
			<svg>
				<defs>
					<filter id='smoosh'>
						<feGaussianBlur in='SourceGraphic' stdDeviation={10} />
						<feColorMatrix
							in='name'
							mode='matrix'
							values='1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 30 -15'
						/>
						<feBlend in='SourceGraphic' />
					</filter>
				</defs>
			</svg>
		</>
	)
}

export default Background
