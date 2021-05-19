import React, { createRef, useState } from 'react'

import './Home.scss'

const gravatar = require('gravatar').url('bryanburns93@gmail.com', { s: '250' })

export default function Home() {
	const [limitStamp, setLimitStamp] = useState(0)
	const [ledBrightness, setLedBrightness] = useState(0)
	const [iconMorph, setIconMorph] = useState('fa-laptop-house')
	const [borderColor, setBorderColor] = useState('#cfcfcf')

	let LED = createRef()
	function getDistance(e) {
		const limitThreshold = 75
		if (e.timeStamp > limitStamp + limitThreshold) {
			setLimitStamp(e.timeStamp)
			const ledX = LED.current.offsetLeft + LED.current.offsetWidth
			const ledY = LED.current.offsetTop + LED.current.offsetHeight
			const ledDist = Math.sqrt((ledX - e.clientX) ** 2 + (ledY - e.clientY) ** 2)

			const prevMax = 350
			const prevMin = 50
			const prevRange = prevMax - prevMin

			const newMax = 1
			const newMin = 0
			const newRanges = newMax - newMin

			setLedBrightness(1 - Math.min(Math.max(((ledDist - prevMin) * newRanges) / prevRange + newMin, 0), 1))
		}
	}

	function setMorph(x) {
		const icons = {
			garden: {
				color: '#26ac56',
				icon: 'fa-hand-holding-seedling',
			},
			arduino: {
				color: '#009298',
				icon: 'fa-microchip',
			},
			raspberry: {
				color: '#bf1d47',
			},
			default: {
				color: '#cfcfcf',
				icon: 'fa-laptop-house',
			},
		}
		let { icon, color } = icons[x]
		if (x === 'raspberry') {
			const y = Math.random()
			if (y <= 0.33) icon = 'fa-raspberry-pi'
			else if (y <= 0.66) icon = 'fa-pizza-slice'
			else icon = 'fa-pie'
			console.log(y, icon)
		}
		setBorderColor(color)
		setIconMorph(icon)
	}

	return (
		<div className="home">
			<div className="about" data-aos="fade" onMouseMove={getDistance}>
				<div className="about__bio">
					<div>
						<h1>
							Hello, I'm <span>Bryan</span>
						</h1>
						<img className="about__photo" src={gravatar} />
					</div>
					<p style={{ textAlign: 'right', borderRight: `1px solid rgba(247, 199, 56, ${Math.max(ledBrightness, 0.8)})` }}>
						<i
							className="fad fa-lightbulb icon__LED"
							style={{ '--fa-secondary-opacity': Math.max(ledBrightness, 0.5), '--fa-secondary-color': `rgb(247, 199, 56)`, filter: `drop-shadow(0 -6px 12px rgba(247, 199, 56, ${Math.min(ledBrightness, 0.5)}))` }}
						></i>
						I am passionate about programming and love developing products that improve quality of life. After one of my early Arduino sketches that connected a photoresistor to an{' '}
						<span
							className="span__LED"
							ref={LED}
							style={{
								textShadow: `0 0 8px rgba(247, 199, 56, ${ledBrightness})`,
							}}
						>
							LED
						</span>{' '}
						to make a rudimentary nightlight, I began to appreciate the power of combining data and software. Delivering this data in a streamlined, efficient, and aesthetically pleasing manner using modern technologies is what drives me
						to grow as a software developer.
					</p>
					<p style={{ borderLeft: `1px solid ${borderColor}`, transition: 'border .5s ease-in-out' }}>
						<i className={`${iconMorph === 'fa-raspberry-pi' ? 'fab' : 'fad'} ${iconMorph} icon__Morph`} style={{ '--fa-secondary-opacity': Math.max(ledBrightness, 0.5) }}></i>
						When I'm not programming professionally, I am usually working on automating tasks in my home. Most recently I've been developing an{' '}
						<span className="span__garden" onMouseEnter={() => setMorph('garden')}>
							automated garden
						</span>{' '}
						to expand my knowledge of sustainable agriculture. I have also been working on a project to integrate an{' '}
						<span className="span__arduino" onMouseEnter={() => setMorph('arduino')}>
							Arduino
						</span>{' '}
						and{' '}
						<span className="span__raspberry" onMouseEnter={() => setMorph('raspberry')}>
							Raspberry Pi
						</span>{' '}
						into my car to provide more information about the vehicle's internal systems than is typically displayed in the OEM dashboard.
					</p>
				</div>

				<div className="about__techs">
					<b>Technologies I'm familiar with</b>

					<div className="about__techs--grid">
						<div className="about__techs--react">
							<i className="fab fa-react"></i>
							<b>React</b>
						</div>
						<div className="about__techs--sass">
							<i className="fab fa-sass"></i>
							<b>Sass</b>
						</div>
						<div className="about__techs--css3">
							<i className="fab fa-css3-alt"></i>
							<b>CSS3</b>
						</div>
						<div className="about__techs--html5">
							<i className="fab fa-html5"></i>
							<b>HTML5</b>
						</div>
						<div className="about__techs--js">
							<i className="fab fa-js-square"></i>
							<b>JavaScript</b>
						</div>
						<div className="about__techs--github">
							<i className="fab fa-git"></i>
							<i className="fab fa-github"></i>
							<b>Git/GitHub</b>
						</div>
						<div className="about__techs--bootstrap">
							<i className="fab fa-bootstrap"></i>
							<b>Bootstrap</b>
						</div>
						<div className="about__techs--node">
							<i className="fab fa-node-js"></i>
							<b>Node.js</b>
						</div>
						<div className="about__techs--python">
							<i className="fab fa-python"></i>
							<b>Python</b>
						</div>
						<div className="about__techs--raspberry">
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
