import { Omit } from 'react-redux'

export function pick<T, K extends keyof T> (object: T, ...keys: K[]): Pick<T, K> {
	const copy: Partial<T> = {}
	keys.forEach(k => {
		copy[k] = object[k]
	})
	return copy as Pick<T, K>
}

export function omit<T extends object, K extends keyof T> (object: T, ...keys: K[]): Omit<T, K> {
	const copy = { ...object as object } as T
	keys.forEach(k => {
		delete copy[k]
	})
	return copy
}

export function capitalize (str: string): string {
	return str.substr(0, 1).toLocaleUpperCase() + str.substr(1, str.length)
}

export function computeOverallRating (...ratings: number[]): number {
	const relevant = ratings.filter(rating => rating !== 0)
	return Math.round(relevant.reduce((a, b) => a + b, 0) / relevant.length)
}
