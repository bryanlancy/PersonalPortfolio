'use client'

import React, { FC } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Project } from '@/app/data/project-list'

import styles from './DescriptionCard.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)
interface DescriptionCardProps {
	paragraphs: Project['description']
}

const DescriptionCard: FC<DescriptionCardProps> = ({ paragraphs }) => {
	useGSAP(() => {
		const descriptionCardTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.walkons',
				start: 'top center-=100px',
				end: '+=300px',
				toggleActions: 'play none resume reverse',
			},
		})
		descriptionCardTl.to(`.${styles.card}`, {
			x: 0,
			autoAlpha: 1,
			ease: 'elastic.out',
			duration: 0.75,
		})
	}, [])

	return (
		<div className={styles.card}>
			<div className={styles.color}></div>
			<div className={styles.text}>
				{paragraphs.map((paragraph, i) => {
					return <p key={i}>{paragraph}</p>
				})}
			</div>
		</div>
	)
}

export default DescriptionCard
