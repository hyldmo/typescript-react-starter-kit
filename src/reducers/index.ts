import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import tracker from './tracker'
import version from './version'

const reducers = (history: History) => combineReducers({
	router: connectRouter(history),
	tracker,
	version
})

export default reducers
