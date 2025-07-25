import React, { FC } from 'react'
import ProjectCard from '../../ProjectBanner'
import { projectList } from '@/app/data'

import styles from './TwoBeeks.module.scss'

interface TwoBeeksBannerProps {}

const TwoBeeksBanner: FC<TwoBeeksBannerProps> = ({}) => {
	const { twoBeeks: data } = projectList
	return (
		<ProjectCard className={styles.background} projectName='2Beeks'>
			<h1 className={styles.title}>{data.name}</h1>
		</ProjectCard>
	)
}

export default TwoBeeksBanner
