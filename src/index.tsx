import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './styles/main.pcss'

import App from './containers/App'
import Root from './containers/Root'


const rootDiv = document.getElementById('root')

const render = (Component: any) => {
	ReactDOM.render(
		<Root>
			<Component />
		</Root>,
		rootDiv
	)
}

if (module.hot) {
	module.hot.accept('./containers/App', () => {
		render(require('./containers/App').default)
	})
}

render(App)

