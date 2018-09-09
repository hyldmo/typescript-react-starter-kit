import { Actions } from 'actions'
import { SLEEPINGPILL_URL } from 'consts'
import { Omit } from 'react-redux'
import { call, put, takeEvery } from 'redux-saga/effects'
import { Session, Speaker } from 'types'
import { api, ApiResponse } from 'utils'

export default function* () {
	yield takeEvery('FETCH_SESSIONS', fetchSessions)
}

type SessionsResponse = {
	sessions: Array<Omit<Session, 'speakers'> & {
		speakers: Speaker[],
		startTimeZulu: string
		endTimeZulu: string
	}>
}

function* fetchSessions (action: typeof Actions.fetchSessions) {
	const url = `${SLEEPINGPILL_URL}/allSessions/${action.payload.slug}`
	const response: ApiResponse<SessionsResponse> = yield call(api, url)

	if (response.ok) {
		const sessions = response.body.sessions.map(sesh => ({
			...sesh,
			speakers: sesh.speakers
				.map(s => s.name)
				.join(', '),
			startTime: new Date(sesh.startTimeZulu),
			endTime: new Date(sesh.endTimeZulu)
		}))
		yield put(Actions.fetchSessionsSuccess(sessions))
	}
}
