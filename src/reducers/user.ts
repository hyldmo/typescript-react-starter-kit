import { Action } from 'actions'

type State = string | null
export default function (state: State = null, action: Action): State {
	switch (action.type) {
		default:
			return state
	}
}
