import React from 'react'

import './Projects.scss'

// import ProjectContainer from './ProjectContainer'
import ProjectContainer from './ProjectContainerNew'

export default function Projects() {
	const projects = [
		{
			image: 'clonify-screenshot.jpg',
			icon: 'fab fa-spotify',
			title: 'Clonify',
			sub: 'a Spotify clone',
			desc: `With Spotify API you can listen to songs you search for. Sign up and like songs, artists, and playlists to begin receiving customized suggestions.`,
		},
		{
			image: 'que-it-screenshot.jpg',
			icon: 'fab fa-quora',
			title: 'Que-It',
			sub: 'a Quora clone',
			desc: `Do you want to gain or share your musical knowledge? In this Quora clone, you can join the conversation and ask or answers any questions you're interested in.`,
		},
		{
			image: 'fetch-screenshot.jpg',
			icon: 'fab fa-instagram',
			title: 'Fetch',
			sub: 'an Instagram clone',
			desc: `Instagram with a twist. You can only upload images of dogs! With Google Vision API we can check to make sure you're following the rules!`,
		},
	]
	return (
		<>
			<div className="projects">
				<h2 className="projects__title">Projects</h2>
				{projects.map((p, i) => (
					<ProjectContainer key={`${p.title}-container`} image={p.image} icon={p.icon} title={p.title} sub={p.sub} desc={p.desc} left={i % 2 !== 0 ? true : false} />
				))}
			</div>
		</>
	)
}
