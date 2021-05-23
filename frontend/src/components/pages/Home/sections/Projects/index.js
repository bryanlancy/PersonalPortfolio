import React from 'react'

import './Projects.scss'

import ProjectContainer from './ProjectContainer'

export default function Projects() {
	const projects = [
		{
			image: 'clonify-screenshot.PNG',
			icon: <i className="fab fa-spotify"></i>,
			title: 'Clonify',
			sub: 'a Spotify clone',
			desc: `With Spotify API you can listen to songs you search for. Sign up and like songs, artists, and playlists to begin receiving customized suggestions.`,
		},
		{
			image: 'que-it-screenshot.PNG',
			icon: <i className="fab fa-quora"></i>,
			title: 'Que-It',
			sub: 'a Quora clone',
			desc: `Do you want to gain or share your musical knowledge? In this Quora clone, you can join the conversation and ask or answers any questions you're interested in.`,
		},
		{
			image: 'fetch-screenshot.PNG',
			icon: <i className="fab fa-instagram"></i>,
			title: 'Fetch',
			sub: 'an Instagram clone',
			desc: `Instagram with a twist. You can only upload images of dogs! With Google Vision API we can check to make sure you're following the rules!`,
		},
	]
	return (
		<div className="projects" data-aos="fade">
			<h2>Projects</h2>
			<div className="projects">
				{projects.map((p, i) => (
					<ProjectContainer key={`${p.title}-container`} image={p.image} icon={p.icon} title={p.title} sub={p.sub} desc={p.desc} left={i % 2} />
				))}
			</div>
		</div>
	)
}
