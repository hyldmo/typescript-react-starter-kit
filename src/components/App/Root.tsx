import { Actions } from 'actions'
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import RedBox from 'redbox-react'
import configureStore, { history } from '../../configureStore'
import App from './App'

const store = configureStore()
store.dispatch(Actions.loadUser())

type State = {
	error: Error | null
}

class Root extends React.Component<{}, State> {
	state = {
		error: null
	}

	componentWillReceiveProps () {
		this.setState({ error: null })
	}

	componentDidCatch (error: Error, info: React.ErrorInfo) {
		this.setState({ error })
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
