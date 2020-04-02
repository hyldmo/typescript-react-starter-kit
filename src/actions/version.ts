import { makeActionCreator } from 'utils'

export default {
	fetchVersion: makeActionCreator<'FETCH_VERSION', string>('FETCH_VERSION'),
	versionFetched: makeActionCreator<'VERSION_FETCHED', string>('VERSION_FETCHED')
}
