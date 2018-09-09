import { Omit } from 'react-redux'

export type Rating = 0 | 1 | 2 | 3 | 4 | 5 | number

export interface Feedback {
	overall: Rating,
	relevance: Rating,
	content: Rating,
	quality: Rating,
	comments?: string
}

export interface FeedbackResult {
	online: Omit<Feedback, 'comments'> & {count: 0.0}
	paper: {
		green: number
		yellow: number
		red: number
	}
	participants: number
}

export type FeedbackResponse = {
	session: FeedbackResult
	conference: FeedbackResult
	comments: string[]
}
