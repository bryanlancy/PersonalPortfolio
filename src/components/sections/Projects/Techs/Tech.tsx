import { FC, useState } from 'react'
import { techList } from '@/app/data'

import styles from './Techs.module.scss'
import { createBackground } from '../../Contact/ContactCard'
import { cn } from '@/utils/react'

interface TechProps {
	name: string
	category?: string
}

const Tech: FC<TechProps> = ({ name: techName }) => {
	const techInfo = techList[techName]
	const { title, color } = techInfo
	const [name, setName] = useState(title)
	const [name2, setName2] = useState<string | null>(null)

	if (!techInfo) {
		console.error(`Could not find tech info for "${techName}".`)
		return null
	}

	if (name.includes('/')) {
		const [name1, name2] = name.split('/')
		setName(name1)
		setName2(name2)
	}

	return (
		<div
			className={cn(styles.tech, styles[techName])}
			style={{
				// @ts-expect-error
				'--primaryColor': color,
				background: createBackground(color),
			}}>
			<h2 className={styles.title}>{name}</h2>
			{name2 && <h2 className={styles.title2}>{name2}</h2>}
		</div>
	)
}

export default Tech
