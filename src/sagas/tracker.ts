import { Action, Actions } from 'actions'
import { Predicate } from 'redux-saga'
import { call, put, select, takeLatest  } from 'redux-saga/effects'
import { State } from 'types'
import { sleep } from 'utils'

const SAVE_KEY = 'activity_tracker'

const predicate: Predicate<Action> = (a: Action) => a.type.includes('ACTIVITY')

export default function* () {
	yield takeLatest<Action>(predicate as any, save)
	yield takeLatest('SAVE_LOAD', load)
}

function* save () {
	yield call(sleep, 100)
	const tracker: State['tracker'] = yield select<State>(s => s.tracker)
	localStorage.setItem(SAVE_KEY, JSON.stringify(tracker))
}

function* load () {
	const saveState = localStorage.getItem(SAVE_KEY)
	if (saveState)
		yield put(Actions.saveLoaded(JSON.parse(saveState)))
}
