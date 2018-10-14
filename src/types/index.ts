import reducers from 'reducers'
export * from './tracker'

export type State = ReturnType<typeof reducers>
