'use client'

import { useState } from 'react'

import TitleSections from './TitleSections'
import StoryButtons from './StoryButtons'
import MouseEffects from './MouseEffects'
import FallingLetters from './FallingLetters'
import { NoSsr } from '@/utils/next'
import { cn } from '@/utils/react'

import styles from './Intro.module.scss'
import Background from './Background'

export default function Intro() {
	const [currentTitle, setCurrentTitle] =
		useState<string>('Software Engineer')

	const handleTitleChange = (title: string) => {
		setCurrentTitle(title)
	}

	return (
		<section className={cn(styles.section, 'introSection')}>
			<NoSsr>
				<MouseEffects currentTitle={currentTitle} />
				<Background currentTitle={currentTitle} />
				<FallingLetters currentTitle={currentTitle} />
				<TitleSections onTitleChange={handleTitleChange} />
			</NoSsr>
			<StoryButtons />
		</section>
	)
}
