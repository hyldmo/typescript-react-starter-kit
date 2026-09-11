export interface Activity {
	name: string
	startDate: Date
	max: number
	intervalsPerSession: number
	sessionsPerWeek: number
}

export interface ActivityValue {
	base: number
	setModifier: number
	bonus: number
	total: number
}
