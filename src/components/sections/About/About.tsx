'use client'

import React from 'react'

import styles from './About.module.scss'
import Quote from './Quote'
import Story from './Story'

const quote =
	'Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.'
const author = 'Muhammad Waseem'

const About = () => {
	return (
		<section>
			<h1>A little about me</h1>

			<Quote quote={quote} author={author} />
			<Story />
		</section>
	)
}

export default About
