// TypeScript fork of https://github.com/melvinsembrano/date-diff

export class DateDiff {

	static divisors = {
		days: 1000 * 60 * 60 * 24,
		hours: 1000 * 60 * 60,
		minutes: 1000 * 60,
		seconds: 1000
	}

	readonly date1: Date
	readonly date2: Date
	readonly difference: number

	constructor (date1: Date, date2: Date) {
		this.date1 = date1
		this.date2 = date2
		this.difference = Math.floor(+date1 - +date2)
	}

	public weeks () {
		this._roundIt(this.days() / 7)
	}

	public days () {
		return this._roundIt(this.difference / DateDiff.divisors.days)
	}

	public hours () {
		return this._roundIt(this.difference / DateDiff.divisors.hours)
	}

	public minutes () {
		return this._roundIt(this.difference / DateDiff.divisors.minutes)
	}

	public seconds () {
		return this._roundIt(this.difference / DateDiff.divisors.seconds)
	}

	public months () {
		const eom = this.endOfMonth(this.date2).getDate()
		let ret
		ret = (this.date1.getFullYear() - this.date2.getFullYear()) * 12
		ret += this.date1.getMonth() - this.date2.getMonth()
		ret += (this.date1.getDate() / eom) - (this.date2.getDate() / eom)
		return this._roundIt(ret)
	}

	public years () {
		const eom = this.endOfMonth(this.date2).getDate()
		let ret
		ret = this.date1.getFullYear() - this.date2.getFullYear()
		ret += (this.date1.getMonth() - this.date2.getMonth()) / 12
		ret += (this.date1.getDate() / eom) - (this.date2.getDate() / eom)
		return this._roundIt(ret)
	}

	public endOfMonth (date: Date) {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0)
	}

	public endOfYear (date: Date) {
		return new Date(date.getFullYear() + 1, 0, 0)
	}

	private _roundIt (v: number) {
		return parseFloat(v.toFixed(1))
	}
}
