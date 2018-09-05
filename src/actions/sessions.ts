import { createAction } from './actionCreator'

import { Feedback, Session } from '../types'

const DemoActions = {
	fetchSessions: createAction<'FETCH_SESSIONS', number>('FETCH_SESSIONS'),
	fetchSessionsSuccess: createAction<'FETCH_SESSIONS_SUCCESS', Session[]>('FETCH_SESSIONS_SUCCESS'),
	submitFeedback: createAction<'SUBMIT_FEEDBACK', Feedback>('SUBMIT_FEEDBACK'),
	submitFeedbackSuccess: createAction<'SUBMIT_FEEDBACK_SUCCESS'>('SUBMIT_FEEDBACK_SUCCESS'),
	submitFeedbackError: createAction<'SUBMIT_FEEDBACK_ERROR', {}>('SUBMIT_FEEDBACK_ERROR')
}

export default DemoActions
