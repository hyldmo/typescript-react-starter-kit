import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import RedBox from 'redbox-react'
import configureStore, { history } from '../configureStore'
import { State } from '../reducers'


const initialState: Partial<State> = {

}

const store = configureStore(initialState as State)

export default class Root extends React.Component {
	state = {
		error: null
	}

	componentWillReceiveProps () {
		this.setState({ error: null })
	}

	componentDidCatch (error: Error, info: React.ErrorInfo) {
		// Display fallback UI
		this.setState({ error })
	}

	render () {
		const { error } = this.state
		if (error !== null) {
			// You can render any custom fallback UI
			return <RedBox error={error} />
		}
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					{module.hot ? (
						<AppContainer>
							{this.props.children as React.ReactElement<any>}
						</AppContainer>
					) : (
						this.props.children
					)}
				</ConnectedRouter>
			</Provider>
		)
	}
}
