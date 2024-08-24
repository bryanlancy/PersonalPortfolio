import React, { FC, useEffect, useState } from 'react'
import projectList from './project-list'
import ProjectPreview from './ProjectPreview'

interface ProjectsProps {
	/** Maximum number of projects to show in list */
	max?: number
}

const Projects: FC<ProjectsProps> = ({ max = Infinity }) => {
	const projectArray = []
	for (const projectName in projectList) {
		const project = projectList[projectName]
		projectArray.push(project)
	}
	projectArray.sort((a, b) => (a.priority > b.priority ? -1 : 1))

	return (
		<section>
			<h1>Projects</h1>
			<ul>
				{projectArray.map((project, i) => {
					// If i is greater than or equal to max return null
					return i < max ? (
						<li key={i}>
							<ProjectPreview project={project} />
						</li>
					) : null
				})}
			</ul>
		</section>
	)
}

export default Projects
