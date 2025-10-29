'use client'

import React, { FC, PropsWithChildren, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { cn } from '@/utils/react'

import styles from './ProjectBanner.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ProjectTechs {
	frontend: string[]
	backend: string[]
	devops: string[]
}

// TODO larger height of mercury banner messes with overlay fade?
// TODO Add techs used component

interface ProjectBannerProps extends PropsWithChildren {
	projectName: string
	className?: string
	techs: ProjectTechs
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
	const overlayRef = useRef(null)
	const sectionRef = useRef(null)

	// TODO Use framer useTransform instead of mapRange
	// TODO Add project spec section - techs, company link,

	useGSAP(() => {
		if (sectionRef.current) {
			const overlayTl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top top',
					end: '+=300px',
					scrub: true,
				},
			})
			overlayTl.to(overlayRef.current, {
				autoAlpha: 1,
			})
		}
	}, [])

	return (
		<section className={cn(styles.project, className)} ref={sectionRef}>
			<div
				key={`overlay${projectName}`}
				className={styles.overlay}
				ref={overlayRef}></div>

			{children}
		</section>
	)
}

export default ProjectBanner
