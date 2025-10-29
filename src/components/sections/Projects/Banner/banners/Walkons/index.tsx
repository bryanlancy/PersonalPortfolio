'use client'

import React, { FC } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import Container from '@/utils/components/Container'
import Background from './Background'
import ProjectBanner from '../../ProjectBanner'
import Tiles from './Tiles'
import QuarterBack from './Quarterback'
import DescriptionCard from './DescriptionCard'
import Button from './Button'
import Border from './Border'
import { cn } from '@/utils/react'

import { projectList } from '@/app/data'

import styles from './WalkOns.module.scss'

gsap.registerPlugin(useGSAP)

const WalkOnsBanner: FC = ({}) => {
	useGSAP(() => {
		const titleTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.walkons`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		titleTl.to(
			`.${styles.title}`,

			{ autoAlpha: 1, y: 0, duration: 0.5 }
		)
	})

	const { walkOns: data } = projectList

	const projectName = "Walk On's"

	return (
		<ProjectBanner
			className={cn(styles.background, 'walkons')}
			projectName={projectName}
			techs={{
				frontend: ['nextjs', 'typescript', 'scss', 'tailwinds'],
				backend: ['graphql'],
				devops: ['cloudflare'],
			}}>
			<Background />

			<Container>
				<DescriptionCard paragraphs={data.description} />

				{/* Project Link */}
				<Button />

				{/* Project Title */}

				<h1 key='title' className={styles.title}>
					{data.name}
				</h1>

				<Tiles />

				<QuarterBack />
			</Container>

			<Border />
		</ProjectBanner>
	)
}

export default WalkOnsBanner
