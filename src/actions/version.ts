import { createAction } from './actionCreator'

const DemoActions = {
	fetchVersion: createAction<'FETCH_VERSION', string>('FETCH_VERSION'),
	versionFetched: createAction<'VERSION_FETCHED', string>('VERSION_FETCHED')
}

export default DemoActions
