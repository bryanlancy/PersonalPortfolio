import React, { FC } from 'react'
import ProjectCard from '../../ProjectBanner'
import { projectList } from '@/app/data'

import styles from './Otto.module.scss'

interface OttoCardProps {}

const OttoCard: FC<OttoCardProps> = ({}) => {
	const { otto: data } = projectList
	return (
		<ProjectCard className={styles.background} projectName='Otto'>
			<h1 className={styles.title}>{data.name}</h1>
		</ProjectCard>
	)
}

export default OttoCard
