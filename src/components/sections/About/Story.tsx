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
import Graphs from './Chapters/Graphs'
import { SpreadsheetContextProvider } from '@/context/spreadsheetContext'

import styles from './Story.module.scss'

interface StoryProps {}

/*
	Animation timeline

	Animation:
	Child icon surrounded by tech stuff
	Adult pops up, show question asked
	Curiosity?

	Transition:
	Zoom into computer screen, reveals next panel
*/

const Story: FC<StoryProps> = ({}) => {
	return (
		<div className={styles.story}>
			<Chapter1 />
			<SpreadsheetContextProvider>
				<Chapter2 />
				<Spreadsheet />
				<Graphs />
				<Chapter3 />
			</SpreadsheetContextProvider>
			<Chapter4 />
			<Chapter5 />
			<Chapter6 />
		</div>
	)
}

export default Story

// const paragraph1 = `
//     I didn't always know that I loved coding.
//     I always had a knack for technology, but it wasn't until one day when my grandfather asked if I knew how computers worked that I realized how little I knew and became curious.
// `
// const paragraph2 = `
//     At first I just worked on becoming a power user and started building computers with some basic repairs.
//     I was introduced to spread sheets at my first job in 2011 and was quickly interested in all the things you could do with some fancy formulas.
//     I was able automate a lot of the math we did every night, and at a later job I made a spreadsheet that worked with a barcode scanner and was used to manage millions of dollars of inventory, but I was already hitting some limitations
// `
// const paragraph3 = `
//     I was struggling with waking up early for the job I had at the time and had an app that used your sleep patterns to trigger an alarm so you'd wake up feeling more rested and read that sunrise can have similar effects.
//     But this was 2015 and smart light bulbs were still very expensive.
//     So I took the plunge and bought an Arduino starter kit to try and make my own alarm clock that could turn on some leds in my room to help me wake up.
// `
// // TODO FIX LINE BREAK!
// const paragraph4 = `
//     The first time I wired an LED to a photoresistor and my code was uploaded and working is when I knew I'd be doing this for the rest of my life.
//     I was hooked on learning more and it wasn't long before I needed to know how to connect my projects together and access them remotely.
//     I found myself learning everything I could about web development, and a big advantage I found early on was it's accesibility.
//     \n <br/> No fancy hardware or tools, no electronics knowledge. Just a basic computer and an internet connection and you're good to go.
// `
// const paragraph5 = `
//     After a couple years of learning and projects for myself I felt ready to start building a portfolio and take on a "real" project.
//     Finally, in 2021, I landed my first full-time software development position and I've been developing full-time ever since.
//     I've gotten to work on some cool projects in that time and still frequently work on my own projects at home (I've got some down below!).
// `

// const paragraph1 = `I've always been drawn to technology, but I didn't realize how little I understood it until my grandfather once asked me how computers work. That question sparked a curiosity that's shaped my career ever since.`
// const paragraph2 = `It started with building PCs and doing basic repairs. In 2011, I got into spreadsheets at my first job and was fascinated by how much you could do with formulas. I automated nightly math tasks and later built a barcode-scanning spreadsheet used to manage millions in inventory. But I eventually hit the limits of what spreadsheets could do.`
// const paragraph3 = `In 2015, while trying to solve my own problem—waking up early—I bought an Arduino kit to build a sunrise alarm clock with LEDs. The first time I saw an LED respond to code I had written, I was hooked. I knew this was something I wanted to do for the rest of my life.`
// const paragraph4 = `Wanting to connect my Arduino projects and control them remotely, I turned to web development. Its accessibility was a big draw—no special tools, just a computer and an internet connection.`
// const paragraph5 = `After a couple of years learning and building personal projects, I landed my first full-time dev job in 2021. I've been building software professionally ever since, while continuing to work on passion projects at home (some of which you can check out below).`
