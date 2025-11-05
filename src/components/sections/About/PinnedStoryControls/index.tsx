'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@/utils/react'
import ShowHide from './ShowHide'

import styles from './PinnedStoryControls.module.scss'
import {
	faPlay,
	faLeftLongToLine,
	faRightLongToLine,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/solid'

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger)

interface StoryControlsProps {
	className?: string
}

const StoryControls = ({ className }: StoryControlsProps) => {
	const controlsRef = useRef<HTMLDivElement>(null)
	const buttonsRef = useRef<HTMLDivElement>(null)
	const [isCollapsed, setIsCollapsed] = useState(false)

	const { contextSafe } = useGSAP({ scope: controlsRef })

	const handleAuto = contextSafe(() => {
		// Calculate remaining scroll distance to projects section
		const projectsElement = document.getElementById('projects')
		if (!projectsElement) return

		const currentScrollY = window.scrollY || window.pageYOffset
		const projectsTop = projectsElement.getBoundingClientRect().top + currentScrollY
		const remainingDistance = Math.abs(projectsTop - currentScrollY)

		// Calculate duration based on steady scroll speed (pixels per second)
		// Using 400 pixels per second for a smooth, steady scroll
		const scrollSpeed = 400 // pixels per second
		const calculatedDuration = remainingDistance / scrollSpeed

		// Ensure minimum duration to avoid too-fast scrolling
		const duration = Math.max(calculatedDuration, 0.5)

		gsap.to(window, {
			duration,
			ease: 'none',
			scrollTo: { y: '#projects', autoKill: true },
		})
	})

	const backToTop = contextSafe(() => {
		gsap.to(window, {
			duration: 0,
			scrollTo: { y: 0, autoKill: true },
		})
	})

	const skipToProjects = () => {
		const projectsDiv = document.getElementById('projects')
		projectsDiv?.scrollIntoView({ behavior: 'instant' })
	}

	const toggleCollapse = contextSafe(() => {
		if (isCollapsed) {
			// Expand
			gsap.to(controlsRef.current, {
				autoAlpha: 1,
				y: 0,
				duration: 0.3,
				ease: 'power2.out',
			})
			gsap.to(buttonsRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.3,
				ease: 'power2.out',
			})
		} else {
			// Collapse
			gsap.to(controlsRef.current, {
				autoAlpha: 0,
				y: 200,
				duration: 0.3,
				ease: 'power2.out',
			})
			gsap.to(buttonsRef.current, {
				opacity: 0,
				y: -20,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
		setIsCollapsed(!isCollapsed)
	})

	useGSAP(() => {
		const showHideTl = gsap.timeline({
			scrollTrigger: {
				trigger: '#storyButtons',
				start: 'bottom top-=80px',
				pin: `.${styles.storyControlsContainer}`,
				end: '+=26500px',
				toggleActions: 'play reverse play reverse',
			},
		})
		showHideTl.to(`.${styles.storyControlsContainer}`, {
			autoAlpha: 1,
		})
	}, [])

	return (
		<div className={cn(styles.storyControlsContainer, className)}>
			<div className={styles.storyControlsWrapper}>
				<ShowHide isCollapsed={isCollapsed} onToggle={toggleCollapse} />
				<div ref={controlsRef} className={styles.storyControls}>
					<div ref={buttonsRef} className={styles.buttons}>
						<button onClick={backToTop} className={styles.top}>
							<FontAwesomeIcon icon={faLeftLongToLine} />
							Back to Top
						</button>
						<button className={styles.auto} onClick={handleAuto}>
							<FontAwesomeIcon icon={faPlay} />
							Play Story
						</button>
						<button
							onClick={skipToProjects}
							className={styles.skip}>
							<FontAwesomeIcon icon={faRightLongToLine} />
							Skip to Projects
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StoryControls
