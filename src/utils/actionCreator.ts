/* eslint-disable no-redeclare */
type EmptyAction<T> = { type: T }

type EmptyActionCreator<T> =      (() => EmptyAction<T>)
type ActionPayloadCreator<T, P> =        ((payload: P) =>  { type: T, payload: P })
type ActionMetaCreator<T, P, M> = ((payload: P, meta: M) => { type: T, payload: P, meta: M })

type ActionMetaOnlyCreator <T, M> = ((meta: M) => { type: T, meta: M })

export function makeActionCreator<T>       (type: T): EmptyActionCreator<T> & EmptyAction<T>
export function makeActionCreator<T, P>    (type: T): ActionPayloadCreator<T, P> & EmptyAction<T>
export function makeActionCreator<T, P, M> (type: T): ActionMetaCreator<T, P, M> & EmptyAction<T>
export function makeActionCreator<T, P, M> (type: T): EmptyActionCreator<T> & ActionPayloadCreator<T, P> & ActionMetaCreator<T, P, M> & EmptyAction<T> {
	const action: any = (payload?: P, meta?: M) => ({
		type,
		payload,
		meta
	})
	action.type = type
	return action
}

export function makeMetaActionCreator<T, M> (type: T): ActionMetaOnlyCreator<T, M> & EmptyAction<T> {
	const action: any = (meta: M) => ({
		type,
		meta
	})
	action.type = type
	return action
}

export type GetMetaActions<T> = T extends { meta: any } ? T : never
