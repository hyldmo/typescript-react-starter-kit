type Action<T, P, M> = { type: T, payload: P, meta: M }
type EmptyActionCreator<T> =      Action<T, undefined, undefined>&(() =>    { type: T })
type ActionCreator<T, P> =        Action<T, P, undefined>&((payload: P) =>  { type: T, payload: P })
type ActionMetaCreator<T, P, M> = Action<T, P, M>&((payload: P, meta: M) => { type: T, payload: P, meta: M })

export function createAction<T>       (type: T): EmptyActionCreator<T>
export function createAction<T, P>    (type: T): ActionCreator<T, P>
export function createAction<T, P, M> (type: T): ActionMetaCreator<T, P, M>
export function createAction<T, P, M> (type: T): EmptyActionCreator<T>&ActionCreator<T, P>&ActionMetaCreator<T, P, M> {
	let action: any
	action = (payload?: P, meta?: M) => ({
		type,
		payload,
		meta
	})
	action.type = type
	return action
}
