import React, { useState, useEffect } from 'react'

import HomePage from './components/pages/Home'

function App() {
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		setIsLoaded(true)
	}, [])

	return isLoaded && <HomePage />
}

export default App
