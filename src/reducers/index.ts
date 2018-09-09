import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import feedback from './feedback'
import sessions from './sessions'
import user from './user'

const reducers = combineReducers({
	routing,
	feedback,
	sessions,
	user
})

export default reducers
