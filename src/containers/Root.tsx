import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import RedBox from 'redbox-react'
import App from '../components/App'
import configureStore, { history } from '../configureStore'

const store = configureStore()

type State = {
	error: Error | null
}

export default class Root extends React.Component<{}, State> {
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
