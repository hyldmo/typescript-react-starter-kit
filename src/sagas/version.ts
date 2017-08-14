import { takeEvery } from 'redux-saga'
import { call, put  } from 'redux-saga/effects'

import { Actions } from '../actions'

export default function * watchConnects () {
	yield takeEvery('FETCH_VERSION', fetchVersion)
}

function* fetchVersion (action: typeof Actions.fetchVersion) {
	const response: Response = yield call(fetch, action.payload)
	yield put(Actions.versionFetched(response.body.toString()))
}
