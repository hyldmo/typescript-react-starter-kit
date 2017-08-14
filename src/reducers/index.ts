import { routerReducer as routing, RouterState } from 'react-router-redux'
import { combineReducers } from 'redux'
import version from './version'

export type State = Readonly<{
	version: string
	routing: RouterState
}>

const reducers = combineReducers<State>({
	routing,
	version
})

export default reducers
