export interface User {
	id: string
	/**
	 * ID of sessions that user has given feedback to
	 */
	feedbacks: string[]
}
