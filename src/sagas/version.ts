import { takeEvery } from 'redux-saga'
import { call, put  } from 'redux-saga/effects'

import { Actions } from '../actions'

export default function * watchConnects () {
	yield takeEvery('FETCH_VERSION', fetchVersion)
}

function* fetchVersion (action: typeof Actions.fetchVersion) {
	const response: Response = yield call(fetch, action.payload)
	const body = yield response.json()
	yield put(Actions.versionFetched(body.version))
}
