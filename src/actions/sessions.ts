import { createAction } from './actionCreator'

import { Event, Feedback, Session } from '../types'

const DemoActions = {
	fetchSessions: createAction<'FETCH_SESSIONS', Event>('FETCH_SESSIONS'),
	fetchSessionsSuccess: createAction<'FETCH_SESSIONS_SUCCESS', Session[]>('FETCH_SESSIONS_SUCCESS'),

	fetchFeedback: createAction<'FETCH_FEEDBACK', Session['sessionId']>('FETCH_FEEDBACK'),
	fetchFeedbackSuccess: createAction<'FETCH_FEEDBACK_SUCCES', Feedback, Session['sessionId']>('FETCH_FEEDBACK_SUCCES'),

	submitFeedback: createAction<'SUBMIT_FEEDBACK', Feedback, Session['sessionId']>('SUBMIT_FEEDBACK'),
	submitFeedbackSuccess: createAction<'SUBMIT_FEEDBACK_SUCCESS'>('SUBMIT_FEEDBACK_SUCCESS'),
	submitFeedbackError: createAction<'SUBMIT_FEEDBACK_ERROR', {}>('SUBMIT_FEEDBACK_ERROR')
}

export default DemoActions
