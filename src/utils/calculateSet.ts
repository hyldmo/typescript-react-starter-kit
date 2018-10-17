import { Activity, ActivityValue } from 'types'

export function calculateSet (current: Activity, session: number, set: number, week: number): ActivityValue {
	const base = current.max / current.intervalsPerSession
	const setModifier = Math.abs(Math.cos((set - 1) * 1.8 + 5)) / 2 + 0.6
	const sessionBonus = getSessionBonus(session)
	const lastWeeksBonus = week > 1 ? calculateSet(current, current.sessionsPerWeek, set, week - 1).bonus : 1
	const weekBonus = getWeekbonus(week / 5)
	const bonus = sessionBonus * weekBonus + (lastWeeksBonus - 1)
	return {
		base,
		setModifier,
		bonus,
		total: Math.ceil(base * setModifier * bonus)
	}
}

const getWeekbonus = (week: number) => (1.0 + week / 16)
const getSessionBonus = (session: number) => (1.0 + session / 10)
