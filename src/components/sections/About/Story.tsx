import { FC } from 'react'

import {
	Chapter1,
	Chapter2,
	Chapter3,
	Chapter4,
	Chapter5,
	Chapter6,
} from './Chapters'
import Spreadsheet from './Chapters/Spreadsheet'
import { Bar, Pie, Scatter } from './Chapters/Graphs'
import { SpreadsheetContextProvider } from '@/context/spreadsheetContext'
import { NoSsr } from '@/utils/next'
import BarSwipe from './Chapters/Graphs/BarSwipe'

import styles from './Story.module.scss'

interface StoryProps {}

const Story: FC<StoryProps> = ({}) => {
	return (
		<div className={styles.story}>
			<Chapter1 />
			<SpreadsheetContextProvider>
				<Chapter2 />
				<Spreadsheet />
				<Pie />
				<NoSsr>
					<Bar /> // Needs to be in NoSsr to avoid gsap errors with
					scatter class name
					<Scatter /> // Needs to be in NoSsr to avoid hydration
					errors
				</NoSsr>
				<Chapter3 />
				<BarSwipe />
			</SpreadsheetContextProvider>
			<Chapter4 />
			<Chapter5 />
			<Chapter6 />
		</div>
	)
}

export default Story
