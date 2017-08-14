import * as React from 'react'
import * as ReactDOM from 'react-dom'
import RedBox from 'redbox-react'

import './styles/main.pcss'

import App from './containers/App'
import Root from './containers/Root'


const rootDiv = document.getElementById('root')

let render = (Component: any) => {
	ReactDOM.render(
		<Root>
			<Component />
		</Root>,
		rootDiv
	)
}

if (module.hot) {
	const renderApp = render

	render = () => {
		try {
			renderApp(App)
		}
		catch (error) {
			const box = <RedBox error={error} />
			renderApp(box)
		}
	}

	module.hot.accept('./containers/App', () => {
		render(require('./containers/App').default)
	})
}
render(App)

