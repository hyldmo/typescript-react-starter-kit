import TrackerActions from './tracker'
import VersionActions from './version'

export const Actions = {
	...TrackerActions,
	...VersionActions
}

export type Action = typeof Actions[keyof typeof Actions]
