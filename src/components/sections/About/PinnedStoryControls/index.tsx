'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bebas_Neue } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@/utils/react'
import ShowHide from './ShowHide'

import styles from './PinnedStoryControls.module.scss'
import {
	faPlay,
	faRightLongToLine,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/solid'

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger)

const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-bebas',
})

interface StoryControlsProps {
	className?: string
}

const StoryControls = ({ className }: StoryControlsProps) => {
	const controlsRef = useRef<HTMLDivElement>(null)
	const buttonsRef = useRef<HTMLDivElement>(null)
	const [isCollapsed, setIsCollapsed] = useState(false)

	const { contextSafe } = useGSAP({ scope: controlsRef })

	const handleAuto = contextSafe(() => {
		gsap.to(window, {
			duration: 90,
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
		<div
			className={cn(
				styles.storyControlsContainer,
				bebasNeue.className,
				className
			)}>
			<div className={styles.storyControlsWrapper}>
				<ShowHide isCollapsed={isCollapsed} onToggle={toggleCollapse} />
				<div ref={controlsRef} className={styles.storyControls}>
					<div ref={buttonsRef} className={styles.buttons}>
						<button className={styles.auto} onClick={handleAuto}>
							<FontAwesomeIcon icon={faPlay} />
							Play Story
						</button>
						<button onClick={backToTop} className={styles.top}>
							Back to Top
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
