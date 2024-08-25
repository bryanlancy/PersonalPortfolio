import React from 'react'
import AnimatedText from './AnimatedText'
import AnimatedIcons from './AnimatedIcons'

const Intro = () => {
	return (
		<section>
			<h1>Hello, I'm Bryan.</h1>
			<div>
				<h2>And I'm a</h2>
				<AnimatedText />
			</div>
			<AnimatedIcons />
		</section>
	)
}

export default Intro
