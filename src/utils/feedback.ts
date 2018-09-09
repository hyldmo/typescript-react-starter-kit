import { BUFFER_MINUTES } from 'consts'
import { Session, SessionFilter, User } from 'types'
import { DateDiff } from 'utils'

export function computeOverallRating (...ratings: number[]): number {
	const relevant = ratings.filter(rating => rating !== 0)
	return Math.round(relevant.reduce((a, b) => a + b, 0) / relevant.length)
}

export function canGiveFeedback (session: Session): boolean {
	const diff = (dt: Date) => new DateDiff(new Date(), dt)
	switch (session.format) {
		case 'workshop':
			return diff(session.startTime).days() >= 0
		default:
			return diff(session.endTime).minutes() >= -BUFFER_MINUTES - 10
	}
}

export function filterSessions (sessions: Session[] | null, user: User, filter: SessionFilter): Session[] {
	if (!sessions)
		return []
	switch (filter) {
		case SessionFilter.mine:
			return sessions
				.filter(sesh => user.feedbacks.includes(sesh.sessionId))
		case SessionFilter.open:
			return sessions.filter(canGiveFeedback)
		case SessionFilter.all:
			return sessions
	}
}
