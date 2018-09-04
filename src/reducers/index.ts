import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import sessions from './sessions'

export type State = ReturnType<typeof reducers>

const reducers = combineReducers({
	routing,
	sessions
})

export default reducers
