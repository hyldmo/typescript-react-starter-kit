import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export * from './actionCreator'
export * from './calculateSet'
export * from './validate'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/**
 * Converts strings from snake case to camel case
 */
export const snakeToCamel = (str: string) =>
	str
		.split('-')
		.map(name => name.charAt(0).toUpperCase() + name.slice(1))
		.join(' ')

export function range(start: number, end?: number): number[] {
	const from = end === undefined ? 0 : start
	const to = end === undefined ? start : end
	return new Array(Math.abs(to - from) + 1).fill(from).map((_, i) => from + i * Math.sign(to - from))
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
