import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './index.scss'

function Root() {
	return <App />
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
)
