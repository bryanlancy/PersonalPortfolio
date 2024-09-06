'use client'

import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import Container from '@/utils/components/Container'
import ProjectBanner from '../../ProjectBanner'
import WalkOnsLogo from './Logo'
import Tiles from './Tiles'
import QuarterBack from './Quarterback'
import DescriptionCard from './DescriptionCard'
import { BarSVG, BarStoolsSVG } from './Quarterback/SVGs'
import { projectList } from '@/app/data'

import styles from './WalkOns.module.scss'

interface WalkOnsBannerProps {}

const WalkOnsBanner: FC<WalkOnsBannerProps> = ({}) => {
	const { walkOns: data } = projectList

	const animRef = useRef(null)
	const [progressState, setProgressState] = useState(0)

	useEffect(() => {
		console.log('Walkons: ', progressState)
	}, [progressState])

	return (
		<ProjectBanner
			className={styles.background}
			projectName="Walk On's"
			animRef={animRef}
			setProgressState={setProgressState}>
			<div className={styles.imageBackground}>
				<div className={styles.overlay}></div>
				<Image
					src='/assets/walkons/walkons.jpg'
					alt='walkons restaurant'
					priority
					width={800}
					height={500}
					className={styles.image}
				/>
			</div>
			<div className={styles.colorBackground}></div>

			<Container>
				<DescriptionCard paragraphs={data.description} />

				{/* Project Link */}
				<a className={styles.link}>Check out the site!</a>

				{/* Project Title */}
				<h1 className={styles.title}>{data.name}</h1>

				<Tiles />
				<QuarterBack />

				<WalkOnsLogo />
			</Container>

			{/* Bar Border */}
			<div className={styles.barBackground}></div>
			<div className={styles.bar}>
				<BarSVG className={styles.svgBar} />
			</div>
			<div className={styles.barStools}>
				<BarStoolsSVG className={styles.svgStools} />
				{/* {stools.map((num, i) => {
					return <BarStoolSVG key={i} className={styles.svgStool} />
				})} */}
			</div>
		</ProjectBanner>
	)
}

export default WalkOnsBanner
