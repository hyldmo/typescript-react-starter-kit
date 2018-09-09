import { Event } from 'types'

export const PRODUCTION = process.env.NODE_ENV === 'production'

export const BASE_URL = PRODUCTION
	? '/devnull-client'
	: ''

/**
 * SleepingPill ID of the current JavaZone
 */
export const CURRENT_JZ: Event = {
	name: 'JavaZone 2018',
	id: '346cb6bd41ea4812971927ffa33e0333',
	slug: 'javazone_2018'
}

export const SLEEPINGPILL_URL = 'https://sleepingpill.javazone.no/public'
export const DEVNULL_URL = PRODUCTION
	? 'https://devnull.javazone.no'
	: 'http://localhost:8082'

export const USER_KEY = 'user_info'

/**
 * The buffer time for leaving feedback after the talk has ended
 */
export const BUFFER_MINUTES = 10
