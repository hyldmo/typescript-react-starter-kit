import { TrackerState } from 'reducers/tracker'
import { Activity } from 'types'
import { createAction } from 'utils'

export default {
	addActivity: createAction<'ADD_ACTIVITY', Activity>('ADD_ACTIVITY'),
	saveLoaded: createAction<'SAVE_LOADED', TrackerState>('SAVE_LOADED'),
	loadSave: createAction<'SAVE_LOAD'>('SAVE_LOAD')
}
