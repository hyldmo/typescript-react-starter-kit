import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Saga trigger: fetch the latest released version over HTTP.
export const fetchVersion = createAction<string>('version/fetchVersion')

const versionSlice = createSlice({
	name: 'version',
	initialState: '',
	reducers: {
		versionFetched: (_state, action: PayloadAction<string>) => action.payload
	}
})

export const { versionFetched } = versionSlice.actions
export default versionSlice.reducer
