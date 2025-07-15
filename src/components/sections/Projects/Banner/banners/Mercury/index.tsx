import ProjectCard from '../../ProjectBanner'

import { projectList } from '@/app/data'

import styles from './Mercury.module.scss'
import Background from './Background'

const MercuryCard = () => {
	const { mercury: data } = projectList

	return (
		<ProjectCard className={styles.project} projectName='Mercury'>
			<p>{data.description[0]}</p>
			<p>{data.description[1]}</p>
			<p>{data.description[2]}</p>
			<p>{data.description[3]}</p>
			<p>{data.description[4]}</p>

			<Background />
		</ProjectCard>
	)
}

export default MercuryCard
