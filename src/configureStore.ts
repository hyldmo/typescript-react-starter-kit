import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { State } from 'types'
import rootReducer from './reducers'
import SagaManager from './sagas/SagaManager'

const __DEV__ = process.env.NODE_ENV === 'development'

const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore (initialState?: Partial<State>) {
	const store = createStore(
		rootReducer(history),
		initialState || {},
		composeEnhancers(
			applyMiddleware(...middlewares)
		)
	)

	// run sagas
	SagaManager.startSagas(sagaMiddleware)

	if (__DEV__ && module.hot) {
		// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
		module.hot.accept('./reducers', async () => {
			const reducers = await import('./reducers')
			store.replaceReducer(reducers.default as any)
		})

		module.hot.accept('./sagas/SagaManager', async () => {
			const newSagaManager = await import('./sagas/SagaManager')
			SagaManager.cancelSagas(store)
			newSagaManager.default.startSagas(sagaMiddleware)
		})
	}

	return store
}
