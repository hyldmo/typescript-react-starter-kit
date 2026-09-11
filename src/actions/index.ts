import { addActivity, loadSave, saveLoaded } from '../reducers/tracker'
import { fetchVersion, versionFetched } from '../reducers/version'

export const Actions = {
	addActivity,
	saveLoaded,
	loadSave,
	fetchVersion,
	versionFetched
}
