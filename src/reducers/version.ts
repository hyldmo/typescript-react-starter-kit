import { Action } from 'actions'

export default function (state = '', action: Action) {
	switch (action.type) {
		case 'VERSION_FETCHED':
			return action.payload
		default:
			return state
	}
}
