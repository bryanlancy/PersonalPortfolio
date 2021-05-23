import React, { useEffect, useState } from 'react'

import './Intro.scss'

export default function Intro() {
	const [intros, setIntros] = useState([
		{ title: 'software-engineer', icons: [] },
		{ title: 'tinkerer', icons: [] },
		{ title: 'learner', icons: [] },
	])
	const titleTimer = 5000
	useEffect(() => {
		setTimeout(() => {
			const newOrder = [...intros.slice(1), intros[0]]
			setIntros(newOrder)
		}, titleTimer)
	}, [intros])

	return (
		<div className="intro">
			<div>
				<h1>
					Hello, I'm <span>Bryan</span>.
				</h1>
				<h3 className="intro__title">
					I'm a{' '}
					<span className={`intro__title--${intros[0].title}`} style={{ transitionDuration: `${titleTimer / 1000}s` }}>
						{intros[0].title}
					</span>
				</h3>
			</div>
		</div>
	)
}
