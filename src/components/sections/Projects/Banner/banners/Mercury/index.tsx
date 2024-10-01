import React, { FC } from 'react'
import Wave from 'react-wavify'
import { projectList } from '@/app/data'

import ProjectCard from '../../ProjectBanner'

import styles from './Mercury.module.scss'

interface MercuryCardProps {}

const MercuryCard: FC<MercuryCardProps> = ({}) => {
	const { mercury: data } = projectList
	return (
		<ProjectCard className={styles.background} projectName='Mercury'>
			<h1 className={styles.title}>{data.name}</h1>
			<Wave
				className={styles.wave}
				fill='#f79902'
				paused={false}
				style={{ display: 'flex' }}
				options={{
					height: 10,
					amplitude: 25,
					speed: 0.15,
					points: 3,
				}}
			/>
		</ProjectCard>
	)
}

export default MercuryCard
