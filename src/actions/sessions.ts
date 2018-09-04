import { createAction } from './actionCreator'

import { Session } from '../types'

const DemoActions = {
	fetchSessions: createAction<'FETCH_SESSIONS', number>('FETCH_SESSIONS'),
	fetchSessionsSuccess: createAction<'FETCH_SESSIONS_SUCCESS', Session[]>('FETCH_SESSIONS_SUCCESS')
}

export default DemoActions
