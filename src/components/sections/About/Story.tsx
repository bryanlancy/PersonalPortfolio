import React, { FC } from 'react'
import { motion } from 'framer-motion'

import styles from './Story.module.scss'
import Chapter from './Chapter'

interface StoryProps {}

const Story: FC<StoryProps> = ({}) => {
	return (
		<motion.div className={styles.story}>
			<Chapter text={paragraph1} shortText='' step={1} />
			<Chapter text={paragraph2} shortText='' step={2} />
			<Chapter text={paragraph3} shortText='' step={3} />
			<Chapter text={paragraph4} shortText='' step={4} />
			<Chapter text={paragraph5} shortText='' step={5} />

			<p>
				I've got a couple of my favorite and more recent projects listed
				below!
			</p>
		</motion.div>
	)
}

export default Story

const paragraph1 = `
    I didn't always know that I loved coding.
    I always had a knack for technology, but it wasn't until one day when my grandfather asked if I knew how computers worked that I realized how little I knew and became curious.
`
const paragraph2 = `
    At first I just worked on becoming a power user and started building computers with some basic repairs.
    I was introduced to spread sheets at my first job in 2011 and was quickly interested in all the things you could do with some fancy formulas.
    I was able automate a lot of the math we did every night, and at a later job I made a spreadsheet that worked with a barcode scanner and was used to manage millions of dollars of inventory, but I was already hitting some limitations
`
const paragraph3 = `
    I was struggling with waking up early for the job I had at the time and had an app that used your sleep patterns to trigger an alarm so you'd wake up feeling more rested and read that sunrise can have similar effects.
    But this was 2015 and smart light bulbs were still very expensive.
    So I took the plunge and bought an Arduino starter kit to try and make my own alarm clock that could turn on some leds in my room to help me wake up.
`
// TODO FIX LINE BREAK!
const paragraph4 = `
    The first time I wired an LED to a photoresistor and my code was uploaded and working is when I knew I'd be doing this for the rest of my life.
    I was hooked on learning more and it wasn't long before I needed to know how to connect my projects together and access them remotely.
    I found myself learning everything I could about web development, and a big advantage I found early on was it's accesibility.
    \n <br/> No fancy hardware or tools, no electronics knowledge. Just a basic computer and an internet connection and you're good to go.
`
const paragraph5 = `
    After a couple years of learning and projects for myself I felt ready to start building a portfolio and take on a "real" project.
    Finally, in 2021, I landed my first full-time software development position and I've been developing full-time ever since.
    I've gotten to work on some cool projects in that time and still frequently work on my own projects at home (I've got some down below!).
`
