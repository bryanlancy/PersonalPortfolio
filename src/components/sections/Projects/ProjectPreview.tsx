import React, { FC } from 'react'
import { Project } from './project-list'

interface ProjectPreviewProps {
	project: Project
}

const ProjectPreview: FC<ProjectPreviewProps> = ({ project }) => {
	const { name } = project
	return <div>{name}</div>
}

export default ProjectPreview
