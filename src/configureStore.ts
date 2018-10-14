import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { State } from 'types'
import rootReducer from './reducers'
import SagaManager from './sagas/SagaManager'

const __DEV__ = process.env.NODE_ENV === 'development'

const sagaMiddleware = createSagaMiddleware()

export const history = createHistory()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore (initialState?: Partial<State>) {
	const store = createStore(
		rootReducer,
		initialState || {},
		composeEnhancers(
			applyMiddleware(...middlewares)
		)
	)

	// run sagas
	SagaManager.startSagas(sagaMiddleware)

	if (__DEV__ && module.hot) {
		// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
		module.hot.accept('./reducers', () =>
			store.replaceReducer(require('./reducers').default)
		)

		module.hot.accept('./sagas/SagaManager', () => {
			SagaManager.cancelSagas(store)
			require('./sagas/SagaManager').default.startSagas(sagaMiddleware)
		})
	}

	return store
}
