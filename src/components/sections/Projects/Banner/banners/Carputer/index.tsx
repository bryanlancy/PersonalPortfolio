import React, { FC } from 'react'
import ProjectCard from '../../ProjectBanner'
import { projectList } from '@/app/data'

import styles from './Carputer.module.scss'

interface CarputerCardProps {}

const CarputerCard: FC<CarputerCardProps> = ({}) => {
	const { carputer: data } = projectList
	return (
		<ProjectCard
			techs={{ frontend: [], backend: [], devops: [] }}
			className={styles.background}
			projectName='Carputer'>
			<h1 className={styles.title}>{data.name}</h1>
		</ProjectCard>
	)
}

export default CarputerCard
