import React from 'react'

import { Intro, About, Projects, Contact } from './sections'

import './Home.scss'

export default function Home() {
	return (
		<div className="home">
			<Intro />
			<About />
			<Projects />
			<Contact />
		</div>
	)
}
