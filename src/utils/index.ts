export * from './actionCreator'
export * from './calculateSet'

/**
 * Converts strings from snake case to camel case
 */
export const snakeToCamel = (str: string) =>
	str
		.split('-')
		.map(name => name.charAt(0).toUpperCase() + name.slice(1))
		.join(' ')

export function range (start: number, end?: number): number[] {
	if (end === undefined) {
		end = start
		start = 0
	}
	return new Array(Math.abs(end - start) + 1)
		.fill(start)
		.map((_, i) => _ + i * Math.sign(end as number))
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
