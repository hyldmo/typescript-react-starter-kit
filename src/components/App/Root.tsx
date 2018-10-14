import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import configureStore, { history } from '../../configureStore'
import App from './App'

const store = configureStore()

type State = {
	error: Error | null
}

class Root extends React.Component<{}, State> {
	state = {
		error: null
	}

	private RedBoxConstructor: typeof React.Component | null = null

	componentWillReceiveProps () {
		this.setState({ error: null })
	}

	componentDidCatch (error: Error, info: React.ErrorInfo) {
		require('./App.lazybundle')(({ RedBox }: any) => {
			this.RedBoxConstructor = RedBox.default
			this.setState({ error })
		})
	}

	render () {
		const { error } = this.state
		if (error && process.env.NODE_ENV !== 'test' && typeof this.RedBoxConstructor === 'function') {
			return <this.RedBoxConstructor error={error} />
		}
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
			</Provider>
		)
	}
}

export default hot(module)(Root)
