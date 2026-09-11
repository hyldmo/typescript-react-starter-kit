import { combineReducers } from '@reduxjs/toolkit'
import tracker from './tracker'
import version from './version'

const rootReducer = combineReducers({
	tracker,
	version
})

export default rootReducer
