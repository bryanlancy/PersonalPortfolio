import React, { FC } from 'react'
import ProjectCard from '../../ProjectBanner'
import { projectList } from '@/app/data'

import styles from './HomeNetwork.module.scss'

interface HomeNetworkCardProps {}

const HomeNetworkCard: FC<HomeNetworkCardProps> = ({}) => {
	const { network: data } = projectList
	return (
		<ProjectCard className={styles.background} projectName='Home Network'>
			<h1 className={styles.title}>{data.name}</h1>
		</ProjectCard>
	)
}

export default HomeNetworkCard
