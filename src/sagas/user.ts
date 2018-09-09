import { Actions } from 'actions'
import { USER_KEY } from 'consts'
import { put, takeEvery } from 'redux-saga/effects'
import { User } from 'types'
import { LocalStorage } from 'utils'
import uuid from 'uuid'

export default function* () {
	yield takeEvery(Actions.loadUser.type, loadUser)
	yield takeEvery(Actions.generateUser.type, generateUser)
	yield takeEvery(Actions.submitFeedbackSuccess.type, storeFeedback)
}

function* loadUser (action: typeof Actions.loadUser) {
	const user = window.localStorage.getItem(USER_KEY)
	if (user)
		yield put(Actions.loadUserSuccess(JSON.parse(user)))
	else
		yield put(Actions.generateUser())
}

function* generateUser (action: typeof Actions.generateUser) {
	const user = {
		id: uuid(),
		feedbacks: []
	}
	LocalStorage.set<User>(USER_KEY, user)
	yield put(Actions.loadUserSuccess(user))
}

function storeFeedback (action: typeof Actions.submitFeedbackSuccess) {
	const user = LocalStorage.get(USER_KEY) as User
	if (!user.feedbacks.includes(action.meta)) {
		user.feedbacks.push(action.meta)
		LocalStorage.set<User>(USER_KEY, user)
	}
}
