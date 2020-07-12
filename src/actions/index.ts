import TrackerActions from './tracker'
import VersionActions from './version'
import { GetMetaActions } from 'utils'

export const Actions = {
	...TrackerActions,
	...VersionActions
}

export type ActionCreator = typeof Actions[keyof typeof Actions]
type A = ReturnType<ActionCreator>
export type Action<TKey extends ActionTypes = any, TAction extends A = A> = TAction extends { type: TKey } ? TAction : never
export type MetaAction = GetMetaActions<Action>
export type ActionTypes = Action['type']
