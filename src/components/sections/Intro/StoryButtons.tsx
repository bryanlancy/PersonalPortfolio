'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { Bebas_Neue } from 'next/font/google'

import CelebrationElements from './StoryButtons/CelebrationElements'
import DiscouragingElements from './StoryButtons/DiscouragingElements'
import { cn } from '@/utils/react'

import styles from './StoryButtons.module.scss'

gsap.registerPlugin(useGSAP, ScrollToPlugin, SplitText)

const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-bebas',
})

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

	useGSAP(() => {
		const keepScrollingTl = gsap.timeline({
			repeat: -1,
			yoyo: true,
		})
		SplitText.create(`.${styles.keepScrolling} h1`, {
			type: 'chars',
			autoSplit: true,
			onSplit: ({ chars }) => {
				keepScrollingTl.to(chars, {
					y: -12,
					duration: 0.4,
					ease: 'power2.inOut',
					stagger: 0.025,
				})
				keepScrollingTl.to(
					chars,
					{
						y: 0,
						duration: 0.4,
						ease: 'power2.inOut',
						stagger: 0.025,
						delay: 0.425,
					},
					'<'
				)
			},
		})
	})

	return (
		<div
			ref={containerRef}
			className={cn(styles.storyControls, bebasNeue.className)}>
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
						Play Story <span>(Auto Scroll)</span>
					</button>
					<CelebrationElements isVisible={isHovered} duration={0.4} />
				</div>
				<div className={styles.buttonWrapper}>
					<button
						onClick={skipToProjects}
						className={styles.skip}
						onMouseEnter={handleSkipMouseEnter}
						onMouseLeave={handleSkipMouseLeave}>
						Skip to Projects <span>(Boring)</span>
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
