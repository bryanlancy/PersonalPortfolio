import React from 'react'
import AnimatedText from './AnimatedText'
import AnimatedIcons from './AnimatedIcons'

import styles from './Intro.module.scss'

const Intro = () => {
	return (
		<section className={styles.section}>
			<div className={styles.text}>
				<h1 className={styles.title}>Hello, I'm Bryan.</h1>

				<h2 className={styles.subtext}>
					And I'm a <AnimatedText text={'Test'} color={'#ff0000'} duration={5000} />
				</h2>
			</div>
			<AnimatedIcons />
		</section>
	)
}

export default Intro
