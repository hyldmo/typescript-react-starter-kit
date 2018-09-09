export class LocalStorage {
	static get<T> (key: string): T | null {
		const item = localStorage.getItem(key)
		try {
			return JSON.parse(item as any)
		} catch (e) {
			return item as any
		}
	}

	static set<T> (key: string, value: T): void {
		const item = typeof value === 'object'
			? JSON.stringify(value)
			: value
		localStorage.setItem(key, item)
	}
	private constructor () {}
}
