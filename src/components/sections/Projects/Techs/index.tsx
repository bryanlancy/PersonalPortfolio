import { FC } from 'react'

import Tech from './Tech'

import styles from './Techs.module.scss'

interface TechsProps {
	type: 'pro' | 'home'
}

const lists = {
	pro: [
		'nextjs',
		'typescriptJs',
		'git',
		'figma',
		'sass',
		'tailwinds',
		'fontAwesome',
		'gsapMotion',
		'node',
		'docker',
		'graphql',
		'craft',
	],
	home: ['arduinoPi', 'cpp', 'cloudflare'],
}

const Techs: FC<TechsProps> = ({ type }) => {
	return (
		<ul className={styles.container}>
			{lists[type].map((tech, i) => (
				<Tech
					key={`techlist-${tech}`}
					name={tech}
					type={type}
					index={i}
				/>
			))}
		</ul>
	)
}

export default Techs
