'use client'

import { useState } from 'react'

import TitleSections from './TitleSections'

import MouseEffects from './MouseEffects'
import FallingLetters from './FallingLetters'
import Background from './Background'
import { NoSsr } from '@/utils/next'
import { cn } from '@/utils/react'
import consoleEasterEgg from '@/utils/consoleEasterEgg'

import styles from './Intro.module.scss'
import Container from '@/utils/components/Container'

export default function Intro() {
	consoleEasterEgg()

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
				<Container>
					<TitleSections onTitleChange={handleTitleChange} />
				</Container>
			</NoSsr>
		</section>
	)
}
