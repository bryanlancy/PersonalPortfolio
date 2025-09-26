'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import AnimatedText from './AnimatedText'
import AnimatedIcons from './AnimatedIcons'

import styles from './Intro.module.scss'
import { cn } from '@/utils/react'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollToPlugin)

const Intro = () => {
	const sectionRef = useRef<HTMLDivElement>(null)

	const { contextSafe } = useGSAP({ scope: sectionRef })

	const handleAuto = contextSafe(() => {
		gsap.to(window, {
			duration: 90,
			scrollTo: { y: '#projects', autoKill: true },
		})
	})

	const skipToProjects = () => {
		const projectsDiv = document.getElementById('projects')
		projectsDiv?.scrollIntoView({ behavior: 'instant' })
	}

	/*
		Titles
		- software engineer
		- tinkerer
		- learner
	*/

	return (
		<section ref={sectionRef} className={styles.section}>
			<div className={styles.titles}>
				<div className={cn(styles.title, styles.software)}>
					<h1>Software Engineer</h1>
				</div>
				<div className={cn(styles.title, styles.tinkerer)}>
					<h1>Tinkerer</h1>
				</div>
				<div className={cn(styles.title, styles.learner)}>
					<h1>Learner</h1>
				</div>
			</div>
			<div className={styles.text}>
				<h1 className={styles.title}>Hello, I'm Bryan.</h1>

				<h2 className={styles.subtext}>
					And I'm a{' '}
					<AnimatedText
						text={'Test'}
						color={'#ff0000'}
						duration={5000}
					/>
				</h2>
			</div>
			<AnimatedIcons />

			<div className={styles.timelineButtons}>
				<button className={styles.auto} onClick={handleAuto}>
					Play Story
				</button>
				<button onClick={skipToProjects} className={styles.skip}>
					Skip to Projects
				</button>

				<div className={styles.keepScrolling}>
					<p>or</p>
					<b>Keep scrolling to go at your own pace</b>
				</div>
			</div>
		</section>
	)
}

export default Intro
