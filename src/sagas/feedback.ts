import { Actions } from 'actions'
import { CURRENT_JZ, DEVNULL_URL } from 'consts'
import { call, put, takeEvery } from 'redux-saga/effects'
import { api } from 'utils'

export default function* () {
	yield takeEvery(Actions.submitFeedback.type, submitFeedback)
}

function* submitFeedback (action: typeof Actions.submitFeedback) {
	try {
		yield call(api, `${DEVNULL_URL}/events/${CURRENT_JZ.id}/sessions/${action.meta}/feedbacks`, {
			method: 'POST',
			headers: new Headers({ 'Voter-ID': '1' }), // TODO: Add actual userID
			body: JSON.stringify(action.payload)
		})
		yield put(Actions.submitFeedbackSuccess())
	} catch (error) {
		yield put(Actions.submitFeedbackError(error))
	}
}
