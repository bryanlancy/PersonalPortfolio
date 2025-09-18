'use client'

import { FC, PropsWithChildren } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@awesome.me/kit-ddd907bdb7/icons/classic/solid'
import { faLightCeiling } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'

import {
	CarputerBanner,
	HomeNetworkBanner,
	MercuryBanner,
	// OttoBanner,
	TwoBeeksBanner,
	WalkOnsBanner,
} from './Banner'
import { BannerContextProvider } from '@/context/bannerContext'
import Container from '@/utils/components/Container'
import Techs from './Techs'
import { cn } from '@/utils/react'

import styles from './Projects.module.scss'

interface ProjectsProps {}

// TODO Add Technology component and sidebar

interface SideBannerProps extends PropsWithChildren {
	name: string
}
const SideBanner: FC<SideBannerProps> = ({ name, children }) => {
	return (
		<div className={cn(styles.sideBanner, styles[name])}>
			<Container>
				<h2>{children}</h2>
			</Container>
		</div>
	)
}

const Projects: FC<ProjectsProps> = () => {
	gsap.registerPlugin(useGSAP)
	gsap.registerPlugin(ScrollTrigger)

	const scrollTrigger = {
		trigger: `.proTitle`,
		start: 'top center',
	}

	useGSAP(() => {
		gsap.fromTo(
			`.${styles.high}`,
			{
				transform: 'scaleY(1)',
			},
			{
				scrollTrigger,
				transform: 'scaleY(.75) translateY(-10px)',
				duration: 1,
			}
		)

		gsap.fromTo(
			`.${styles.lights}`,
			{
				color: '#ffffff',
			},
			{ scrollTrigger, color: '#e9fa79', duration: 0.75 }
		)
		gsap.fromTo(
			`:is(.${styles.cloud}, .${styles.light})`,
			{
				autoAlpha: 0,
				opacity: 0,
			},
			{
				autoAlpha: 1,
				scrollTrigger,
				opacity: 1,
			}
		)
	}, [])

	return (
		<BannerContextProvider>
			<section id='projects' className={styles.projects}>
				<div className={styles.proText}>
					<h1 className={cn(styles.title, 'proTitle')}>
						<span className={styles.professional}>
							Professional
						</span>
						<span className={styles.high}>
							<FontAwesomeIcon
								className={styles.cloud}
								icon={faCloud}
							/>
							High
						</span>
						<span className={styles.lights}>
							<FontAwesomeIcon
								className={styles.light}
								icon={faLightCeiling}
							/>
							lights
						</span>
					</h1>
					<SideBanner name='proTechs'>Technologies</SideBanner>
					<Techs type='pro' />
				</div>
				<ul>
					<SideBanner name='proProjects'>Projects</SideBanner>
					<WalkOnsBanner />
					<MercuryBanner />
					{/* <OttoBanner /> */}
					<TwoBeeksBanner />
				</ul>
			</section>
			{/* <section className={styles.projects}>
				<div className={styles.homeText}>
					<h1 className={styles.title}>Personal Projects</h1>
					<p className={styles.description}>
						I still love learning new things in my free time. Here's
						a couple technologies and projects I'm currently working
						on at home.
					</p>
					<SideBanner name='homeTechs'>Technologies</SideBanner>
					<Techs type='home' />
				</div>

				<ul>
					<SideBanner name='homeProjects'>Projects</SideBanner>
					<HomeNetworkBanner />
					<CarputerBanner />
				</ul>
			</section> */}
		</BannerContextProvider>
	)
}

export default Projects
