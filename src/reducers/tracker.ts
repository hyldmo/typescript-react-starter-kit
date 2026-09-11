import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Activity } from '~/types/tracker'

export interface TrackerState {
	activities: Activity[]
}

const initialState: TrackerState = {
	activities: []
}

// Saga trigger: reload the persisted tracker from localStorage.
export const loadSave = createAction('tracker/loadSave')

const trackerSlice = createSlice({
	name: 'tracker',
	initialState,
	reducers: {
		addActivity: (state, action: PayloadAction<Activity>) => {
			state.activities.push(action.payload)
		},
		saveLoaded: (_state, action: PayloadAction<TrackerState>) => action.payload
	}
})

export const { addActivity, saveLoaded } = trackerSlice.actions
export default trackerSlice.reducer
