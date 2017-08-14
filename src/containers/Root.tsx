import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import configureStore, { history } from '../configureStore'
import { State } from '../reducers'

const initialState: Partial<State> = {

}

const store = configureStore(initialState as State)

const Root: React.StatelessComponent<any> = (props) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			{module.hot ? (
				<AppContainer>
					{props.children}
				</AppContainer>
			) : (
				props.children
			)}
		</ConnectedRouter>
	</Provider>
)

export default Root
