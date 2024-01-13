import type { NumberRange } from './NumberRange'

describe('NumberRange', () => {
	expectTypeOf<NumberRange<1, 1>>().toMatchTypeOf<1>()
	expectTypeOf<NumberRange<1, 3>>().toMatchTypeOf<1 | 2 | 3>()
	expectTypeOf<NumberRange<3, 5>>().toMatchTypeOf<3 | 4 | 5>()
	expectTypeOf<NumberRange<1, 5>>().toMatchTypeOf<1 | 2 | 3 | 4 | 5>()
})
