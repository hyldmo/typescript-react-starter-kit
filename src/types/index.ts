import reducers from 'reducers'
export * from './tracker'

export type State = ReturnType<typeof reducers>

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Selector<T> = (t: T) => unknown
