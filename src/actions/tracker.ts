import { TrackerState } from 'reducers/tracker'
import { Activity } from 'types'
import { makeActionCreator } from 'utils'

export default {
	addActivity: makeActionCreator<'ADD_ACTIVITY', Activity>('ADD_ACTIVITY'),
	saveLoaded: makeActionCreator<'SAVE_LOADED', TrackerState>('SAVE_LOADED'),
	loadSave: makeActionCreator<'SAVE_LOAD'>('SAVE_LOAD')
}
