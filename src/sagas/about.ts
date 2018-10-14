import { Actions } from 'actions'
import { call, put, takeEvery  } from 'redux-saga/effects'

export default function* () {
	yield takeEvery('FETCH_VERSION', fetchVersion)
}

function* fetchVersion (action: typeof Actions.fetchVersion) {
	const response: Response = yield call(fetch, action.payload)
	const body = yield response.json()
	yield put(Actions.versionFetched(body.version))
}
