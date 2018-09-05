import { Actions } from 'actions'
import { USERID_KEY } from 'consts'
import { put, takeEvery } from 'redux-saga/effects'
import uuid from 'uuid'

export default function* () {
	yield takeEvery(Actions.loadUser.type, loadUser)
	yield takeEvery(Actions.generateUser.type, generateUser)
}

function* loadUser (action: typeof Actions.loadUser) {
	const userId = window.localStorage.getItem(USERID_KEY)
	if (userId)
		yield put(Actions.loadUserSuccess(userId))
	else
		yield put(Actions.generateUser())
}

function* generateUser (action: typeof Actions.generateUser) {
	const userId = uuid()
	window.localStorage.setItem(USERID_KEY, userId)
	yield put(Actions.loadUserSuccess(userId))
}
