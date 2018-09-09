import { Action } from 'actions'
import { User } from 'types'

// Should immediately be overwritten by Actions.loadUser
const initialState: User = {
	id: '',
	feedbacks: []
}

export default function (state: User = initialState, action: Action): User {
	switch (action.type) {
		case 'SUBMIT_FEEDBACK_SUCCESS':
			return {
				...state,
				feedbacks: [...new Set(state.feedbacks.concat(action.meta))]
			}
		case 'USER_LOAD_SUCCESS':
			return action.payload
		default:
			return state
	}
}
