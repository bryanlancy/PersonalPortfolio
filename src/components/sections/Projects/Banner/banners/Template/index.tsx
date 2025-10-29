import React, { FC } from 'react'
import ProjectCard from '../../ProjectBanner'
import { projectList } from '@/app/data'

import styles from './Template.module.scss'

interface TemplateBannerProps {}

const TemplateBanner: FC<TemplateBannerProps> = ({}) => {
	const { template: data } = projectList
	return (
		<ProjectCard
			techs={{ frontend: [], backend: [], devops: [] }}
			className={styles.background}
			projectName='Template'>
			<h1 className={styles.title}>{data.name}</h1>
		</ProjectCard>
	)
}

export default TemplateBanner
