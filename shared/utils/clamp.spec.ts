import { clamp } from './clamp.ts'

describe('clamp', () => {
	it('clamps a value between a minimum and maximum value', () => {
		expect(clamp(1, 0, 2)).toBe(1)
		expect(clamp(3, 0, 2)).toBe(2)
		expect(clamp(-1, 0, 2)).toBe(0)
		expect(clamp(1.5, 0, 2)).toBe(1.5)
		expect(clamp(2.5, 0, 2)).toBe(2)
		expect(clamp(-0.5, 0, 2)).toBe(0)
		expect(clamp(1.7, 1.2, 1.8)).toBe(1.7)
		expect(clamp(1.1, 1.2, 1.8)).toBe(1.2)
		expect(clamp(1.9, 1.2, 1.8)).toBe(1.8)
	})
})
