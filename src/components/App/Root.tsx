import { Actions } from 'actions'
import { ConnectedRouter } from 'connected-react-router'
import RedBox from 'redbox-react'
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
	state: State = {
		error: null
	}

	static getDerivedStateFromError (error: Error) {
		return { error }
	}

	componentDidCatch (error: Error, info: React.ErrorInfo) {
		// tslint:disable-next-line:no-console
		console.warn(info)
	}

	render () {
		const { error } = this.state
		if (error && process.env.NODE_ENV !== 'test') {
			return <RedBox error={error} />
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
