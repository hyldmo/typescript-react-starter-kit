import { Action } from 'actions'
import { Session } from 'types'

type State = {
	sessions: Session[] | null
	status: 'loading' | 'success' | 'error'
}

const intialState: State = {
	sessions: null,
	status: 'loading'
}

export default function (state: State = intialState, action: Action): State {
	switch (action.type) {
		case 'FETCH_SESSIONS_SUCCESS':
			return {
				...state,
				sessions: action.payload,
				status: 'success'
			}
		case 'FETCH_SESSIONS':
			return {
				...state,
				status: 'loading'
			}
		default:
			return state
	}
}
