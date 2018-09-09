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
