import { FC } from 'react'

import Box from './Box'

import styles from './Projects.module.scss'
import Desk from './Desk'

interface BoxesProps {
	hobby: number
	pro: number
}
const Boxes: FC<BoxesProps> = ({ hobby, pro }) => {
	const hobbyBoxes = []
	const proBoxes = []
	const boxOffset = 80
	for (let i = 0; i < hobby; i++) {
		hobbyBoxes.push(
			<Box
				start={200 + i * 400}
				type='hobby'
				endY={-i * boxOffset}
				size={120}
			/>
		)
	}
	for (let i = 0; i < pro; i++) {
		proBoxes.push(
			<Box
				start={2000 + i * 350}
				type='pro'
				endY={-i * boxOffset}
				size={120}
			/>
		)
	}

	return (
		<div className={styles.boxes}>
			{hobbyBoxes}
			{proBoxes}
		</div>
	)
}

const Projects = () => {
	return (
		<div className={styles.container}>
			<Boxes hobby={6} pro={4} />
			<Desk />
		</div>
	)
}

export default Projects
