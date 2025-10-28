'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import styles from './StoryButtons.module.scss'
import CelebrationElements from './StoryButtons/CelebrationElements'
import DiscouragingElements from './StoryButtons/DiscouragingElements'

gsap.registerPlugin(useGSAP, ScrollToPlugin)

const StoryButtons = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isHovered, setIsHovered] = useState(false)
	const [isSkipHovered, setIsSkipHovered] = useState(false)

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

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

	const handleSkipMouseEnter = () => {
		setIsSkipHovered(true)
	}

	const handleSkipMouseLeave = () => {
		setIsSkipHovered(false)
	}

	return (
		<div ref={containerRef} className={styles.storyControls}>
			<div className={styles.keepScrolling}>
				<h1>Keep scrolling to go at your own pace</h1>
				<h2>or</h2>
			</div>
			<div className={styles.buttons}>
				<div className={styles.buttonWrapper}>
					<button
						className={styles.auto}
						onClick={handleAuto}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}>
						Play Story
					</button>
					<CelebrationElements isVisible={isHovered} duration={0.4} />
				</div>
				<div className={styles.buttonWrapper}>
					<button
						onClick={skipToProjects}
						className={styles.skip}
						onMouseEnter={handleSkipMouseEnter}
						onMouseLeave={handleSkipMouseLeave}>
						Skip to Projects
					</button>
					<DiscouragingElements
						isVisible={isSkipHovered}
						duration={0.4}
					/>
				</div>
			</div>
		</div>
	)
}

export default StoryButtons
