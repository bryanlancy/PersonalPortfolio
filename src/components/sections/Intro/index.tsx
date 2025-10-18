import TitleSections from './TitleSections'
import StoryButtons from './StoryButtons'

import styles from './Intro.module.scss'

import MouseEffects from './MouseEffects'
import { NoSsr } from '@/utils/next'

export default function Intro() {
	// await new Promise(resolve => setTimeout(resolve, 6000))
	return (
		<section className={styles.section}>
			<TitleSections />
			<NoSsr>
				<MouseEffects />
			</NoSsr>
			<StoryButtons />
		</section>
	)
}
