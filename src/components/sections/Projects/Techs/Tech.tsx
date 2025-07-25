import { FC } from 'react'
import { techList } from '@/app/data'

import styles from './Techs.module.scss'

interface TechProps {
	name: string
	category?: string
}

const Tech: FC<TechProps> = ({ name: techName }) => {
	const techInfo = techList[techName]

	if (!techInfo) {
		console.error(`Could not find tech info for "${techName}".`)
		return null
	}

	const { name, color } = techInfo

	return (
		<div
			className={styles.tech}
			// @ts-expect-error
			style={{ '--primaryColor': color }}>
			{name}
		</div>
	)
}

export default Tech
