import { createAction } from 'utils'

export default {
	fetchVersion: createAction<'FETCH_VERSION', string>('FETCH_VERSION'),
	versionFetched: createAction<'VERSION_FETCHED', string>('VERSION_FETCHED')
}
