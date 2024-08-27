import React from 'react'
import AnimatedText from './AnimatedText'
import AnimatedIcons from './AnimatedIcons'

import styles from './Intro.module.scss'

const Intro = () => {
	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Hello, I'm Bryan.</h1>
			<div className={styles.text}>
				<h2>And I'm a</h2>
				<AnimatedText />
			</div>
			<AnimatedIcons />
		</section>
	)
}

export default Intro
