import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import sessions from './sessions'
import user from './user'

const reducers = combineReducers({
	routing,
	sessions,
	user
})

export default reducers
