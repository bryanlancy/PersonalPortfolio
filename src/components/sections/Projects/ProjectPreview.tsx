import React, { FC } from 'react'
import { Project } from './project-list'

import styles from './ProjectPreview.module.scss'

interface ProjectPreviewProps {
	project: Project
}

const ProjectPreview: FC<ProjectPreviewProps> = ({ project }) => {
	const { name } = project
	return <div className={styles.preview}>{name}</div>
}

export default ProjectPreview
