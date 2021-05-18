import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.css'

function Navigation() {
	return (
		<NavLink exact to="/">
			Home
		</NavLink>
	)
}

export default Navigation
