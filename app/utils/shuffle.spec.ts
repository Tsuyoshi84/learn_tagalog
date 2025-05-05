import { shuffle } from './shuffle.ts'

describe('shuffle', () => {
	it('has the same length as the input', () => {
		const array = [1, 2, 3, 4, 5]
		const shuffledArray = shuffle(array)
		expect(shuffledArray).toHaveLength(array.length)
	})

	it('has the same elements as the input', () => {
		const array = [1, 2, 3, 4, 5]
		const shuffledArray = shuffle(array)
		expect(shuffledArray).toEqual(expect.arrayContaining(array))
	})
})
