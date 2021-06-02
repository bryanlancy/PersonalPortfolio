import React, { createRef, useState } from 'react'

import './About.scss'

export default function About() {
	//  Burnout LED if user plays with it too much
	// Guy replaces bulb?
	// Fucks up and dies?

	const [limitStamp, setLimitStamp] = useState(0)
	const [ledBrightness, setLedBrightness] = useState(0)
	const [iconMorph, setIconMorph] = useState('fa-laptop-house')
	const [iconOptions, setIconOptions] = useState({})
	const [borderColor, setBorderColor] = useState('#cfcfcf')

	const gravatar = require('gravatar').url('bryanburns93@gmail.com', { s: '250' })
	const LED = createRef()

	function getDistance(e) {
		const limitThreshold = 75
		if (e.timeStamp > limitStamp + limitThreshold) {
			setLimitStamp(e.timeStamp)
			const ledX = LED.current.offsetLeft + LED.current.offsetWidth + LED.current.offsetParent.offsetLeft
			const ledY = LED.current.offsetTop + LED.current.offsetHeight + LED.current.offsetParent.offsetTop
			const ledDist = Math.sqrt((ledX - e.pageX) ** 2 + (ledY - e.pageY) ** 2)

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
				options: {
					'--fa-primary-color': '#26ac56',
					// '--fa-secondary-color': '#26ac56',
				},
			},
			arduino: {
				color: '#009298',
				icon: 'fa-microchip',
				options: {
					'--fa-primary-color': '#009298',
					// '--fa-secondary-color': '#26ac56',
				},
			},
			raspberry: {
				color: '#bf1d47',
				options: {
					'--fa-primary-color': '#bf1d47',
					// '--fa-secondary-color': '#26ac56',
				},
			},
			default: {
				color: '#cfcfcf',
				icon: 'fa-laptop-house',
				options: {
					'--fa-primary-color': '#016cb4',
					// '--fa-secondary-color': '#26ac56',
				},
			},
		}
		let { icon, color, options } = icons[x]
		if (x === 'raspberry') {
			const y = Math.random()
			if (y <= 0.1) icon = 'fa-pie'
			else if (y <= 0.2) icon = 'fa-pizza-slice'
			else {
				icon = 'fa-raspberry-pi'
				options = { color: '#bf1d47' }
			}
		}
		setBorderColor(color)
		setIconMorph(icon)
		setIconOptions(options)
	}

	return (
		<div className="about" onMouseMove={getDistance} onMouseLeave={() => setMorph('default')}>
			<div className="about__bio">
				<div data-aos="fade" data-aos-offset="250">
					<p>REPLACE WITH BIO</p>
					<img className="about__photo" src={gravatar} alt="gravatar-profile" />
				</div>
				<p data-aos="fade" data-aos-offset="300" style={{ textAlign: 'right', borderRight: `1px solid rgba(247, 199, 56, ${Math.max(ledBrightness, 0.8)})` }}>
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
					to make a rudimentary nightlight, I began to appreciate the power of combining data and software. Delivering this data in a streamlined, efficient, and aesthetically pleasing manner using modern technologies is what drives me to
					grow as a software developer.
				</p>
				<p
					data-aos="fade"
					data-aos-offset="300"
					style={{
						borderLeft: `1px solid ${borderColor}`,
						transition: 'all .5s ease-in-out',
					}}
				>
					<i className={`${iconMorph === 'fa-raspberry-pi' ? 'fab' : 'fad'} ${iconMorph} icon__Morph`} style={iconOptions}></i>
					When I'm not programming professionally, I am usually working on automating tasks in my home. Most recently, I've been developing an{' '}
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
					into my car to provide more information about the vehicle's internal systems than is typically displayed on the OEM dashboard.
				</p>
			</div>

			<div className="about__techs" data-aos="fade" data-aos-offset="250">
				<div className="about__techs--title">
					<hr />
					<b>Technologies I'm familiar with</b>
					<hr />
				</div>

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
	)
}
