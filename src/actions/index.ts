import ConferenceActions from './sessions'

export const Actions = {
	...ConferenceActions
}

export type Action = typeof Actions[keyof typeof Actions]
