import type { ArrayAtLeast } from './ArrayAtLeast'

describe('ArrayAtLeast', () => {
	expectTypeOf<ArrayAtLeast<number, 1>>().toMatchTypeOf<[number, ...number[]]>()
	expectTypeOf<ArrayAtLeast<number, 2>>().toMatchTypeOf<[number, number, ...number[]]>()
	expectTypeOf<ArrayAtLeast<number, 3>>().toMatchTypeOf<[number, number, number, ...number[]]>()
})
