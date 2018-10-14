import { range } from '../src/utils'

describe(range, () => {
	it('When first parameter is provided creates a range from 0 to n', () => {
		const result = range(5)
		expect(result).toEqual([0, 1, 2, 3, 4, 5])
	})
	it('When both parameters are provided creates a range from n1 to n2', () => {
		const result = range(5, 10)
		expect(result).toEqual([5, 6, 7, 8, 9, 10])
	})

	it('Handles going from positive to negative numbers', () => {
		const result = range(5, -5)
		expect(result).toEqual([5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5])
	})

	it('Handles going from negative to positive numbers', () => {
		const result = range(-5, 5)
		expect(result).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
	})

	it('Handles going from negative to negative numbers', () => {
		const result = range(-5, -10)
		expect(result).toEqual([-5, -6, -7, -8, -9, -10])
	})
})
