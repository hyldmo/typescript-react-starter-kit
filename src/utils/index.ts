export * from './api'
export * from './DateDiff'
export * from './feedback'
export * from './LocalStorage'
export * from './object'

export function capitalize (str: string): string {
	return str.substr(0, 1).toLocaleUpperCase() + str.substr(1, str.length)
}
