'use client'

import TitleSections from './TitleSections'
import StoryButtons from './StoryButtons'

import styles from './Intro.module.scss'

import MouseEffects from './MouseEffects'
import { NoSsr } from '@/utils/next'

const Intro = () => {
	return (
		<section className={styles.section}>
			<TitleSections />
			<NoSsr>
				<MouseEffects debug={true} />
			</NoSsr>

			<StoryButtons />
		</section>
	)
}

export default Intro
