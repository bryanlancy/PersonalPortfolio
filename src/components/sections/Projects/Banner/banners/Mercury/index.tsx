import ProjectCard from '../../ProjectBanner'

import { projectList } from '@/app/data'

import styles from './Mercury.module.scss'
import Background from './Background'
import Bucket from './Bucket'
import Container from '@/utils/components/Container'

const MercuryCard = () => {
	const { mercury: data } = projectList

	return (
		<ProjectCard className={styles.project} projectName='Mercury'>
			<Background />
			<Container className={styles.container}>
				{data.description.map((text, i) => (
					<Bucket className={styles[`bucket${i}`]} text={text} />
				))}
			</Container>
		</ProjectCard>
	)
}

export default MercuryCard
