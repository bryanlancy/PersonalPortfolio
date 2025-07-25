'use client'

import React, { FC } from 'react'

import styles from './Projects.module.scss'

import {
	CarputerBanner,
	HomeNetworkBanner,
	MercuryBanner,
	// OttoBanner,
	TwoBeeksBanner,
	WalkOnsBanner,
} from './Banner'
import { BannerContextProvider } from '@/context/bannerContext'
import Techs from './Techs'
import Container from '@/utils/components/Container'

interface ProjectsProps {}

// TODO Add Technology component and sidebar

const Projects: FC<ProjectsProps> = () => {
	return (
		<BannerContextProvider>
			<section className={styles.projects}>
				<div className={styles.proText}>
					<Container>
						<h1 className={styles.title}>
							Professional Highlights
						</h1>
						<p className={styles.description}>
							Here's a couple of technologies I've used on a
							professional level and some of my favorite projects.
						</p>
						<Techs type='pro' />
					</Container>
				</div>
				<WalkOnsBanner />
				<MercuryBanner />
				{/* <OttoBanner /> */}
				<TwoBeeksBanner />
			</section>
			<section className={styles.projects}>
				<div className={styles.homeText}>
					<Container>
						<h1 className={styles.title}>Personal Projects</h1>
						<p className={styles.description}>
							I still love learning new things in my free time.
							Here's a couple technologies and projects I'm
							currently working on at home.
						</p>
						<Techs type='home' />
					</Container>
				</div>

				<HomeNetworkBanner />
				<CarputerBanner />
			</section>
		</BannerContextProvider>
	)
}

export default Projects
