'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Bebas_Neue } from 'next/font/google'

import { cn } from '@/utils/react'

import styles from './StoryControls.module.scss'

gsap.registerPlugin(useGSAP, ScrollToPlugin)

const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-bebas',
})

interface StoryControlsProps {
	className?: string
}

const StoryControls = ({ className }: StoryControlsProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isCollapsed, setIsCollapsed] = useState(false)

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

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed)
	}

	return (
		<div
			ref={containerRef}
			className={cn(
				styles.storyControls,
				bebasNeue.className,
				className,
				{ [styles.collapsed]: isCollapsed }
			)}>
			<div className={styles.buttons}>
				<button className={styles.auto} onClick={handleAuto}>
					Play Story <span>(Auto Scroll)</span>
				</button>
				<button onClick={skipToProjects} className={styles.skip}>
					Skip to Projects <span>(Boring)</span>
				</button>
			</div>
			<button
				className={styles.collapseButton}
				onClick={toggleCollapse}
				aria-label={
					isCollapsed ? 'Expand controls' : 'Collapse controls'
				}>
				{isCollapsed ? '←' : '→'}
			</button>
		</div>
	)
}

export default StoryControls
