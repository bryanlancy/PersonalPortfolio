import React, { FC } from 'react'
import ProjectCard from '../../ProjectBanner'
import { projectList } from '@/app/data'

import styles from './Mercury.module.scss'

interface MercuryCardProps {}

const MercuryCard: FC<MercuryCardProps> = ({}) => {
	const { mercury: data } = projectList
	return (
		<ProjectCard className={styles.background} projectName='Mercury'>
			<h1 className={styles.title}>{data.name}</h1>
		</ProjectCard>
	)
}

export default MercuryCard
