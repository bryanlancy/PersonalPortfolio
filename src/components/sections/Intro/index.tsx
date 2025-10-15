'use client'

import TitleSections from './TitleSections'
import StoryButtons from './StoryButtons'

import styles from './Intro.module.scss'
import Container from '@/utils/components/Container'
import MouseTrail from './MouseTrail'

const Intro = () => {
	return (
		<section className={styles.section}>
			<TitleSections />
			<Container>
				<h1 className={styles.name}>Hello, I'm Bryan.</h1>
			</Container>
			<MouseTrail />
			<StoryButtons />
		</section>
	)
}

export default Intro
