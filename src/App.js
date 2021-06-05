import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './components/pages/Home'
import Navigation from './components/Navigation'

function App() {
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		setIsLoaded(true)
	}, [])

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			)}
		</>
	)
}

export default App
