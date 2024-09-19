'use client'

import React, { FC } from 'react'

import styles from './Projects.module.scss'

import {
	CarputerBanner,
	HomeNetworkBanner,
	MercuryBanner,
	OttoBanner,
	WalkOnsBanner,
} from './Banner'
import { BannerContextProvider } from '@/context/bannerContext'

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => {
	return (
		<BannerContextProvider>
			<section className={styles.projects}>
				<h1 className={styles.title}>Professional Highlights</h1>
				<p className={styles.description}>
					Here's a couple of technologies I've used on a professional
					level and some of my favorite projects.
				</p>
				<div className={styles.tech}>Pro Techs</div>
				<WalkOnsBanner />
				<MercuryBanner />
				<OttoBanner />
			</section>
			<section className={styles.projects}>
				<h1 className={styles.title}>Personal Projects</h1>
				<p className={styles.description}>
					I still love learning new things in my free time. Here's a
					couple technologies and projects I'm currently working on at
					home.
				</p>
				<div className={styles.tech}>Home Techs</div>

				<HomeNetworkBanner />
				<CarputerBanner />
			</section>
		</BannerContextProvider>
	)
}

export default Projects
