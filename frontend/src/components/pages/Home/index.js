import React from 'react'

import './Home.scss'

const gravatar = require('gravatar').url('bryanburns93@gmail.com', { s: '750' })

export default function Home() {
	return (
		<div className="home">
			<h2>HOME</h2>
			<div className="about" data-aos="fade">
				<h3>About</h3>
				<div>
					<img className="about__photo" src={gravatar} />
					<p>
						I am passionate about programming and love developing products that assist in the quality of life of the user. After one of my early Arduino sketches that connected a little photoresistor and an led to make a rudimentary
						nightlight, I began to appreciate the power of combining data and software. Delivering this data in a streamlined, efficient, and aesthetically pleasing manner using modern technologies is what drives me to grow as a software
						developer.
					</p>
					<p>
						{' '}
						When I'm not programming professionally, I am usually working on automating tasks in my home. Most recently I've been developing an automated garden to expand my knowledge of sustainable agriculture. I have also been working
						on a project to integrate an Arduino and Raspberry Pi into a vehicle to provide more information about the vehicle's internal systems than is typically displayed in an OEM dashboard.
					</p>
				</div>

				<div>
					<b>Technologies I'm familiar with</b>

					<div>
						<i className="fab fa-react"></i>
						<b>React</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-sass"></i>
						<b>Sass</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-css3-alt"></i>
						<b>CSS3</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-html5"></i>
						<b>HTML5</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-js-square"></i>
						<b>JavaScript</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-git"></i>
						<i className="fab fa-github"></i>
						<b>Git/GitHub</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-bootstrap"></i>
						<b>Bootstrap</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-node-js"></i>
						<b>Node.js</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-python"></i>
						<b>Python</b>
					</div>
					<div className="about__techs">
						<i className="fab fa-raspberry-pi"></i>
						<b>Raspberry Pi</b>
					</div>
				</div>
			</div>
			<div className="projects" data-aos="fade">
				<h3>Projects</h3>
				<div className="projects__container">
					<i className="fab fa-quora"></i> <b>Que-It</b>
				</div>
				<div className="projects__container">
					<i className="fab fa-instagram"></i> <b>Fetch</b>
				</div>
				<div className="projects__container">
					<i className="fab fa-spotify"></i> <b>Clonify</b>
				</div>
			</div>
			<div className="contact" data-aos="fade">
				<h3>Contact</h3>
			</div>
		</div>
	)
}
