import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import tracker from './tracker'
import version from './version'

const reducers = combineReducers({
	routing,
	tracker,
	version
})

export default reducers
