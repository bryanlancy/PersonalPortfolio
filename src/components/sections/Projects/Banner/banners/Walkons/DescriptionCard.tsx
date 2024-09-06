'use client'

import React, { FC, useContext, useEffect } from 'react'

import styles from './WalkOns.module.scss'
import { BannerContext } from '@/context/bannerContext'

interface DescriptionCardProps {
	paragraphs: string[]
}

const DescriptionCard: FC<DescriptionCardProps> = ({ paragraphs }) => {
	const { animState } = useContext(BannerContext)

	// console.log('DescriptionCard: ', animState[0])
	useEffect(() => {
		// const progress = animState[0]
	}, [animState])

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
