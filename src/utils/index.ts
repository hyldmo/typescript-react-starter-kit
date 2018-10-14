import { Activity } from 'types'

export * from './actionCreator'

/**
 * Converts strings from snake case to camel case
 */
export const snakeToCamel = (str: string) =>
	str
		.split('-')
		.map(name => name.charAt(0).toUpperCase() + name.slice(1))
		.join(' ')

export function calculateSet (current: Activity, set: number, week: number): number {
	const result = current.max / current.intervalsPerSession * Math.abs(Math.cos(set)) * (1.2 + week / 5)
	return Math.floor(result)
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
