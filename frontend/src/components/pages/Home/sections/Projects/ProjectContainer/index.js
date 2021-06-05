import React, { useState } from 'react'

import './ProjectContainer.scss'

export default function ProjectContainer({ image, icon, title, sub, desc, left }) {
	const textShift = '15%'
	const defaultTextStyle = { [!left ? 'left' : 'right']: textShift }
	const [textStyle, setTextStyle] = useState(defaultTextStyle)
	function hoverStyle(e) {
		e.type === 'mouseenter' ? setTextStyle({ [!left ? 'left' : 'right']: textShift, transform: `translateX(${!left ? '-' : ''}20vw)`, color: '#fff' }) : setTextStyle(defaultTextStyle)
	}

	return (
		<div className="project" onMouseEnter={hoverStyle} onMouseLeave={hoverStyle} data-aos="fade" data-aos-offset="250">
			<img className="project__image" src={`images/${image}`} alt={`${title}-project`} style={{ [left ? 'left' : 'right']: '-24px' }} />
			<div className="project__text" style={textStyle}>
				<div className="project__text--title">
					{icon} <b>{title}</b>
					<p className="project__text--sub">{sub}</p>
				</div>
				<p className="project__text--desc">{desc}</p>
			</div>
		</div>
	)
}
