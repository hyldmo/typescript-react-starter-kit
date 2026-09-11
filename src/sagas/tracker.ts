import { call, put, select, takeLatest } from 'typed-redux-saga'
import { addActivity, loadSave, saveLoaded } from '../reducers/tracker'
import type { State } from '../types'
import { sleep, trackerSchema } from '../utils'

const SAVE_KEY = 'activity_tracker'

export default function* trackerSaga() {
	yield* takeLatest(addActivity.type, save)
	yield* takeLatest(loadSave.type, load)
}

function* save() {
	yield* call(sleep, 100)
	const tracker = yield* select((s: State) => s.tracker)
	localStorage.setItem(SAVE_KEY, JSON.stringify(tracker))
}

function* load() {
	const saveState = localStorage.getItem(SAVE_KEY)
	if (saveState) {
		const parsed = trackerSchema.safeParse(JSON.parse(saveState))
		if (parsed.success) yield* put(saveLoaded(parsed.data))
	}
}
