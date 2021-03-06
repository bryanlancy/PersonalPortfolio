import React from 'react'

import Resume from './Bryan_Burns_Resume.pdf'

import './Contact.scss'

export default function Contact() {
	return (
		<div className="contact">
			<h2>Get in touch</h2>
			<p className="contact__message">I'm currently looking for a new software engineering role. If you enjoyed my portfolio please feel free to connect with me using the links below.</p>
			<div className="contact__links">
				<a target="_blank" rel="noreferrer" href="https://angel.co/u/bryan-burns-4">
					<div className="contact__links--angellist">
						<i className="fab fa-angellist"></i>
						<p>AngelList</p>
					</div>
				</a>
				<a target="_blank" rel="noreferrer" href="https://github.com/bryanlancy">
					<div className="contact__links--github">
						<i className="fab fa-github"></i>
						<p>GitHub</p>
					</div>
				</a>
				<a target="_blank" rel="noreferrer" href="https://linkedin.com/in/bryan-burns-b45006116/">
					<div className="contact__links--linkedin">
						<i className="fab fa-linkedin-in"></i>
						<p>LinkedIn</p>
					</div>
				</a>
				<a target="_blank" rel="noreferrer" href="mailto:bryanburns93@gmail.com">
					<div className="contact__links--email">
						<i className="fas fa-mailbox"></i>
						<p>Email</p>
					</div>
				</a>
			</div>
			<a href={Resume}>
				<div className="contact__resume">
					<p>Download Resume</p>
				</div>
			</a>
		</div>
	)
}
