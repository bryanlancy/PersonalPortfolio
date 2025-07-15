'use client'

import React, { FC, PropsWithChildren, useContext, useRef } from 'react'
import { cn } from '@/utils/react'

import styles from './ProjectBanner.module.scss'
import {
	useMotionValueEvent,
	useScroll,
	motion,
	AnimatePresence,
} from 'motion/react'
import { BannerContext } from '@/context/bannerContext'
import { mapRange } from '@/utils/general'

interface ProjectBannerProps extends PropsWithChildren {
	projectName: string
	className?: string
	// animRef: RefObject<HTMLElement>
}

/**
 * Use as a wrapper for project content in the 'Projects' section of the page.
 *
 * Wraps all child elements in a `section` element and provides standardized basic styling.
 * Additionally, it adds the section's 'scroll in view' info to the `bannerContext` assist in animations.
 *
 * @returns {React.ReactElement}
 *
 * @component
 * @example
 * return (
 * 	<ProjectBanner projectName='example'>
 * 		<h1>Title</h1>
 * 		<p>Content</p>
 * 	</ProjectBanner>
 * )
 */
const ProjectBanner: FC<ProjectBannerProps> = ({
	/** Class to be added to wrapping `section` element. Only required if additional styling is needed. */
	className,
	/** Name of project. Will be used to access relevant information from `bannerContext` */
	projectName,
	/** Project banner content. Wraps provided children in a `section` element.  */
	children,
}) => {
	const animRef = useRef(null)
	const { animState } = useContext(BannerContext)

	const overlayStart = 0.94

	const { scrollYProgress } = useScroll({
		target: animRef,
		axis: 'y',
		offset: ['-100%', '0px'],
		// smooth: 100,
	})
	useMotionValueEvent(scrollYProgress, 'change', latest => {
		const tempState = { ...animState[0], [projectName]: latest }
		animState[1](tempState)
	})

	// TODO Use framer useTransform instead of mapRange
	// TODO Add project spec section - techs, company link,

	return (
		<motion.section className={cn(styles.project, className)} ref={animRef}>
			<AnimatePresence>
				{animState[0][projectName] >= overlayStart && (
					<motion.div
						key={`overlay${projectName}`}
						initial={{ opacity: 0 }}
						animate={{
							opacity: mapRange(
								animState[0][projectName],
								[overlayStart, 1],
								[0, 0.8]
							),
						}}
						exit={{ opacity: 0 }}
						className={styles.overlay}></motion.div>
				)}
			</AnimatePresence>
			{children}
		</motion.section>
	)
}

export default ProjectBanner
