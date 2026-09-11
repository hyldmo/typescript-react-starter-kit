import { call, put, takeEvery } from 'typed-redux-saga'
import { fetchVersion, versionFetched } from '../reducers/version'

export default function* aboutSaga() {
	yield* takeEvery(fetchVersion.type, fetchVersionSaga)
}

function* fetchVersionSaga(action: ReturnType<typeof fetchVersion>) {
	const response: Response = yield* call(fetch, action.payload)
	const body: { version: string } = yield* call([response, 'json'])
	yield* put(versionFetched(body.version))
}
