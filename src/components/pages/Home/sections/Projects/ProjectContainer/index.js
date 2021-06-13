import React from 'react'

import './ProjectContainer.scss'

export default function ProjectContainer({ image, icon, title, sub, desc, left, link }) {
	const projectDetails = (
		<div className="project__details" style={{ '--offsetDirection': left ? '1%' : '-1%' }}>
			<div className="project__header">
				<i className={`project__icon ${icon}`}></i>
				<p className="project__title">{title}</p>
				<p className="project__title--sub">{sub}</p>
			</div>
			<p className="project__details--desc">{desc}</p>
		</div>
	)

	return (
		<div className="project">
			{left && projectDetails}
			<div className="project__image-container">
				<a target="_blank" rel="noreferrer" href={link}>
					<div className="project__overlay">
						<p>
							Visit Site <i className="far fa-arrow-right"></i>
						</p>
					</div>
					<img className="project__image" src={require(`../images/${image}`).default} alt={`Project-${title}`} />
				</a>
			</div>
			{!left && projectDetails}
		</div>
	)
}
