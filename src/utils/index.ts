export * from './api'
export * from './DateDiff'
export * from './feedback'
export * from './LocalStorage'
export * from './object'

export function capitalize (str: string): string {
	return str.substr(0, 1).toLocaleUpperCase() + str.substr(1, str.length)
}

export function getDay (day: number) {
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	return days[day - 1]
}

export function groupBy<T extends {}> (arr: T[] , by: keyof T): Array<[string, T[]]> {
	const map = new Map<string, T[]>()
	arr.forEach(element => {
		const key = element[by].toString()
		if (map.has(key))
			map.set(key, [...map.get(key), element])
		else
			map.set(key, [element])
	})
	return [...map.entries()]
}
