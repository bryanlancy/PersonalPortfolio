import React from 'react'

import './Home.scss'

const gravatar = require('gravatar').url('bryanburns93@gmail.com', { s: '750' })

export default function Home() {
	return (
		<div className="home">
			<div className="about" data-aos="fade">
				<div className="about__bio">
					<div>
						<h1>Hello, I'm Bryan</h1>
						<img className="about__photo" src={gravatar} />
					</div>
					<p>
						I am passionate about programming and love developing products that improve quality of life. After one of my early Arduino sketches that connected a photoresistor to an <span className="span__LED">LED</span> to make a
						rudimentary nightlight, I began to appreciate the power of combining data and software. Delivering this data in a streamlined, efficient, and aesthetically pleasing manner using modern technologies is what drives me to grow as
						a software developer.
					</p>
					<p>
						When I'm not programming professionally, I am usually working on automating tasks in my home. Most recently I've been developing an <span className="span__garden">automated garden</span> to expand my knowledge of sustainable
						agriculture. I have also been working on a project to integrate an Arduino and <span className="span__raspberry">Raspberry Pi</span> into a vehicle to provide more information about the vehicle's internal systems than is
						typically displayed in an OEM dashboard.
					</p>
				</div>

				<div className="about__techs">
					<b>Technologies I'm familiar with</b>

					<div className="about__techs--grid">
						<div>
							<i className="fab fa-react"></i>
							<b>React</b>
						</div>
						<div>
							<i className="fab fa-sass"></i>
							<b>Sass</b>
						</div>
						<div>
							<i className="fab fa-css3-alt"></i>
							<b>CSS3</b>
						</div>
						<div>
							<i className="fab fa-html5"></i>
							<b>HTML5</b>
						</div>
						<div>
							<i className="fab fa-js-square"></i>
							<b>JavaScript</b>
						</div>
						<div>
							<i className="fab fa-git"></i>
							<i className="fab fa-github"></i>
							<b>Git/GitHub</b>
						</div>
						<div>
							<i className="fab fa-bootstrap"></i>
							<b>Bootstrap</b>
						</div>
						<div>
							<i className="fab fa-node-js"></i>
							<b>Node.js</b>
						</div>
						<div>
							<i className="fab fa-python"></i>
							<b>Python</b>
						</div>
						<div>
							<i className="fab fa-raspberry-pi"></i>
							<b>Raspberry Pi</b>
						</div>
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
