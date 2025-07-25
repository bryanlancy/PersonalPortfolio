import { FC } from 'react'

import styles from './Techs.module.scss'
import Tech from './Tech'

interface TechsProps {
	type: 'pro' | 'home'
}

const lists = {
	pro: [
		'nextjs',
		'sass',
		'css',
		'html',
		'typescript',
		'jsdocs',
		'git',
		'tailwinds',
		'gsap',
		'motion',
		'node',
		'docker',
	],
	home: ['arduinoPi', 'cpp'],
}

const Techs: FC<TechsProps> = ({ type }) => {
	return (
		<div className={styles.container}>
			{lists[type].map(tech => (
				<Tech name={tech} />
			))}
		</div>
	)
}

export default Techs
