'use client'

import TitleSections from './TitleSections'
import StoryButtons from './StoryButtons'

import styles from './Intro.module.scss'

import MouseEffects from './MouseEffects'

const Intro = () => {
	return (
		<section className={styles.section}>
			<TitleSections />

			<MouseEffects
			// debug={true}
			/>
			<StoryButtons />
		</section>
	)
}

export default Intro
