import { call, put, takeEvery } from 'redux-saga/effects'

import { Actions } from 'actions'
import { Session } from 'types'

export default function * watchConnects () {
	yield takeEvery('FETCH_SESSIONS', fetchSessions)
}

function* fetchSessions (action: typeof Actions.fetchSessions) {
	const url = `https://sleepingpill.javazone.no/public/allSessions/javazone_${action.payload}`
	const response: Response = yield call(fetch, url)
	const body: { sessions: Session[] } = yield response.json()
	yield put(Actions.fetchSessionsSuccess(body.sessions))
}
