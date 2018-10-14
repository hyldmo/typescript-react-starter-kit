export type Activity = {
	name: string
	startDate: Date
	max: number
	intervalsPerSession: number
	sessionsPerWeek: number
}

export type ActivityValue = {
	base: number
	setModifier: number
	bonus: number
	total: number
}
