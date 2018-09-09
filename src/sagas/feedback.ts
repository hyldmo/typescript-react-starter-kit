import { Actions } from 'actions'
import { CURRENT_JZ, DEVNULL_URL } from 'consts'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { State, User } from 'types'
import { api, ApiResponse } from 'utils'

export default function* () {
	yield takeEvery(Actions.submitFeedback.type, submitFeedback)
}

function* submitFeedback (action: typeof Actions.submitFeedback) {
	const user: User = yield select<State>(s => s.user)
	const response: ApiResponse = yield call(api, `${DEVNULL_URL}/events/${CURRENT_JZ.id}/sessions/${action.meta}/feedbacks`, {
		method: 'POST',
		headers: new Headers({ 'Voter-ID': user.id }),
		body: JSON.stringify(action.payload)
	})

	if (response.ok)
		yield put(Actions.submitFeedbackSuccess(action.payload, action.meta))
	else {
		yield put(Actions.submitFeedbackError(response.message))
	}
}
