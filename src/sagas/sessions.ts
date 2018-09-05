import { Actions } from 'actions'
import { SLEEPINGPILL_URL } from 'consts'
import { Omit } from 'react-redux'
import { call, put, takeEvery } from 'redux-saga/effects'
import { Session, Speaker } from 'types'

export default function* () {
	yield takeEvery('FETCH_SESSIONS', fetchSessions)
}

type SessionsResponse = { sessions: Array<Omit<Session, 'speakers'> & { speakers: Speaker[] }> }

function * fetchSessions (action: typeof Actions.fetchSessions) {
	const url = `${SLEEPINGPILL_URL}/allSessions/${action.payload.slug}`
	const response: Response = yield call(fetch, url)
	const body: SessionsResponse = yield response.json()
	const sessions = body.sessions.map(sesh => ({
		...sesh,
		speakers: sesh.speakers
			.map(s => s.name)
			.join()
	}))
	yield put(Actions.fetchSessionsSuccess(sessions))
}
