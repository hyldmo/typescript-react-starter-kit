import reducers from 'reducers'
export * from './tracker'

export type State = ReturnType<ReturnType<typeof reducers>>

export type Selector<T> = (t: T) => unknown
