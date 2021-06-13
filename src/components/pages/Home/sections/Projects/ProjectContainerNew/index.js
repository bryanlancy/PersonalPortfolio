import React from 'react'

import './ProjectContainer.scss'

export default function ProjectContainer({ image, icon, title, sub, desc, left }) {
	const projectDetails = (
		<div className="project__details">
			<div className="project__header">
				<i className={`project__icon ${icon}`}></i>
				<p className="project__title">{title}</p>
				<p className="project__title--sub">{sub}</p>
			</div>
			<p className="project__desc">{desc}</p>
		</div>
	)
	return (
		<div className="project">
			{left && projectDetails}
			<img className="project__image" src={require(`../images/${image}`).default} alt={`Project-${title}`} />
			{!left && projectDetails}
		</div>
	)
}
