import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.scss'

function Navigation() {
	return (
		<div className="navbar">
			<NavLink exact to="/">
				Home
			</NavLink>
		</div>
	)
}

export default Navigation
