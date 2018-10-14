import { Action } from 'actions'
import { Activity } from 'types/tracker'

export type TrackerState = {
	activities: Activity[]
}

const initialState: TrackerState = {
	activities: []
}

export default function (state: TrackerState = initialState, action: Action): TrackerState {
	switch (action.type) {
		case 'ADD_ACTIVITY':
			return {
				...state,
				activities: [...state.activities, action.payload]
			}

		case 'SAVE_LOADED':
			return action.payload

		default:
			return state
	}
}
