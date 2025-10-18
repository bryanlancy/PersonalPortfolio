'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import styles from './StoryButtons.module.scss'

gsap.registerPlugin(useGSAP, ScrollToPlugin)

const StoryButtons = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	const { contextSafe } = useGSAP({ scope: containerRef })

	const handleAuto = contextSafe(() => {
		gsap.to(window, {
			duration: 90,
			ease: 'none',
			scrollTo: { y: '#projects', autoKill: true },
		})
	})

	const skipToProjects = () => {
		const projectsDiv = document.getElementById('projects')
		projectsDiv?.scrollIntoView({ behavior: 'instant' })
	}

	return (
		<div ref={containerRef} className={styles.storyControls}>
			<div className={styles.buttons}>
				<button className={styles.auto} onClick={handleAuto}>
					Play Story
				</button>
				<button onClick={skipToProjects} className={styles.skip}>
					Skip to Projects
				</button>
				<div className={styles.keepScrolling}>
					<p>Keep scrolling to go at your own pace</p>
					<b>or</b>
				</div>
			</div>
		</div>
	)
}

export default StoryButtons
