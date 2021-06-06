import React from 'react'

import './index.scss'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/Modal'
import App from './App'

import configureStore from './store'

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
	window.store = store
}

function Root() {
	return (
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
)
