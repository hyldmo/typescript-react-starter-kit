import sessionActions from './sessions'
import userActions from './user'

export const Actions = {
	...sessionActions,
	...userActions
}

export type Action = typeof Actions[keyof typeof Actions]
