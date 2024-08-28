import React, { FC } from 'react'
import projectList from './project-list'
import ProjectPreview from './ProjectPreview'

import styles from './Projects.module.scss'

interface ProjectsProps {
	/** Maximum number of projects to show in list */
	max?: number
}

const Projects: FC<ProjectsProps> = ({ max = Infinity }) => {
	const proProjects = ['walkOns', 'mercury', 'otto']
	const personalProjects = ['homeNetwork', 'carputer']
	// const proTechs = ['']
	// const personalTechs = []

	return (
		<section>
			<div>
				<h1>Professional Highlights</h1>
				<p>While I'm always learning new things and up for any challenge. These are some technologies that I have used on a professional level.</p>
				<ul></ul>
				<ul>
					{proProjects.map((project, i) => {
						// If i is greater than or equal to max return null
						return i < max ? (
							<li key={i}>
								<ProjectPreview project={projectList[project]} />
							</li>
						) : null
					})}
				</ul>
			</div>
			<div>
				<h1>Personal Projects</h1>
				<p>When I'm not working I like to explore all different facets of technology. Here's a couple technologies and projects I've recently played around with in my free time.</p>
				<ul></ul>
				<ul>
					{' '}
					{personalProjects.map((project, i) => {
						// If i is greater than or equal to max return null
						return i < max ? (
							<li key={i}>
								<ProjectPreview project={projectList[project]} />
							</li>
						) : null
					})}
				</ul>
			</div>
		</section>
	)
}

export default Projects
