import { Action, Actions } from 'actions'
import { call, put, select, takeLatest  } from 'redux-saga/effects'
import { Selector, State } from 'types'
import { sleep } from 'utils'

const SAVE_KEY = 'activity_tracker'

const predicate = (a: Action) => a.type.includes('ACTIVITY')

export default function* () {
	yield takeLatest<Action>(predicate, save)
	yield takeLatest('SAVE_LOAD', load)
}

function* save () {
	yield call(sleep, 100)
	const tracker: State['tracker'] = yield select<Selector<State>>(s => s.tracker)
	localStorage.setItem(SAVE_KEY, JSON.stringify(tracker))
}

function* load () {
	const saveState = localStorage.getItem(SAVE_KEY)
	if (saveState)
		yield put(Actions.saveLoaded(JSON.parse(saveState)))
}
