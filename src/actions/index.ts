import DemoActions from './version'

export const Actions = {
	...DemoActions
}

export type Action = typeof Actions[keyof typeof Actions]
