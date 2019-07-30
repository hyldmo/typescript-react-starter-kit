import { Actions } from 'actions'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore, { history } from '../../configureStore'
import App from './App'

const store = configureStore()
store.dispatch(Actions.loadSave())

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
		// tslint:disable-next-line:no-console
		console.warn(info)
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

export default Root
