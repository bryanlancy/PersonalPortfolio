'use client'

import React, { FC } from 'react'
import { useBannerScrollProgress } from '@/hooks'
import { AnimatePresence, motion } from 'motion/react'

import Container from '@/utils/components/Container'
import Background from './Background'
import ProjectBanner from '../../ProjectBanner'
import Tiles from './Tiles'
import QuarterBack from './Quarterback'
import DescriptionCard from './DescriptionCard'
import Button from './Button'
import Border from './Border'

import { projectList } from '@/app/data'

import styles from './WalkOns.module.scss'

interface WalkOnsBannerProps {}

const WalkOnsBanner: FC<WalkOnsBannerProps> = ({}) => {
	const { walkOns: data } = projectList

	const projectName = "Walk On's"
	const progress = useBannerScrollProgress(projectName)

	return (
		<ProjectBanner
			className={styles.background}
			projectName={projectName}
			techs={{
				frontend: ['nextjs', 'typescript', 'scss', 'tailwinds'],
				backend: ['graphql'],
				devops: ['cloudflare'],
			}}>
			<Background animProgress={progress} />

			<Container>
				<DescriptionCard
					paragraphs={data.description}
					animProgress={progress}
				/>

				{/* Project Link */}
				<Button animProgress={progress} />

				{/* Project Title */}
				<AnimatePresence>
					{progress > 0.1 && (
						<motion.h1
							key='title'
							initial={{
								transform: 'translateY(150%)',
								opacity: 0,
							}}
							animate={{
								transform: 'translateY(0%)',
								opacity: 1,
							}}
							exit={{ transform: 'translateY(150%)', opacity: 0 }}
							className={styles.title}>
							{data.name}
						</motion.h1>
					)}
				</AnimatePresence>

				<Tiles animProgress={progress} />

				<QuarterBack animProgress={progress} />
			</Container>

			<Border animProgress={progress} />
		</ProjectBanner>
	)
}

export default WalkOnsBanner
