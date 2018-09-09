import { Action } from 'actions'

// Should immediately be overwritten by Actions.loadUser
type State = {
	error: string | null
	submitting: boolean
}

const initialState: State = {
	error: null,
	submitting: false
}

export default function (state: State = initialState, action: Action): State {
	switch (action.type) {
		case 'SUBMIT_FEEDBACK':
			return {
				...state,
				error: null,
				submitting: true
			}
		case 'SUBMIT_FEEDBACK_SUCCESS':
			return {
				...state,
				error: null,
				submitting: false
			}
		case 'SUBMIT_FEEDBACK_ERROR':
			return {
				...state,
				error: action.payload,
				submitting: false
			}
		default:
			return state
	}
}
