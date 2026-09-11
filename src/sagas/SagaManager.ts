import { all } from 'typed-redux-saga'
import aboutSaga from './about'
import trackerSaga from './tracker'

export default function* rootSaga() {
	yield* all([aboutSaga(), trackerSaga()])
}
