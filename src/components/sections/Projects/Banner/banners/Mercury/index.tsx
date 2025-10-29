import ProjectCard from '../../ProjectBanner'

import { projectList } from '@/app/data'

import styles from './Mercury.module.scss'
import Background from './Background'
import Bucket from './Bucket'
import Container from '@/utils/components/Container'
import { cn } from '@/utils/react'

const MercuryCard = () => {
	//TODO Add skip animation on click
	const { mercury: data } = projectList

	const timings: { delay: number; duration: number }[] = [
		{ delay: 0, duration: 2 }, // Bucket 1
		{ delay: 2, duration: 2 }, // Bucket 2
		{ delay: 4, duration: 2 }, // Bucket 3
		{ delay: 6, duration: 2 }, // Bucket 4
		{ delay: 9, duration: 2 }, // Bucket 5
		{ delay: 13, duration: 2 }, // Bucket 6
	]

	return (
		<ProjectCard
			techs={{ frontend: [], backend: [], devops: [] }}
			className={cn(styles.project, 'mercury')}
			projectName='Mercury'>
			<Background />
			<Container>
				{data.description.map((text, i) => (
					<Bucket
						key={i}
						className={`bucket${i}`}
						text={text}
						delay={timings[i] && timings[i].delay}
						duration={timings[i] && timings[i].duration}
					/>
				))}
			</Container>
		</ProjectCard>
	)
}

export default MercuryCard
