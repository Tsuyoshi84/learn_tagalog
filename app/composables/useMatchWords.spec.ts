import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { useMatchWords } from './useMatchWords.ts'

const sampleWords = ref([
	{ id: '1', en: 'dog', tl: 'aso' },
	{ id: '2', en: 'cat', tl: 'pusa' },
	{ id: '3', en: 'bird', tl: 'ibon' },
])

describe('useMatchWords', () => {
	it('should initialize with empty state', () => {
		const {
			matchedWordIdSet,
			isCompleted,
			shuffledEnWords,
			shuffledTlWords,
			selectedEnWord,
			selectedTlWord,
		} = useMatchWords(sampleWords)

		expect(matchedWordIdSet.value.size).toBe(0)
		expect(isCompleted.value).toBe(false)
		expect(shuffledEnWords.value).toHaveLength(3)
		expect(shuffledTlWords.value).toHaveLength(3)
		expect(selectedEnWord.value).toBeUndefined()
		expect(selectedTlWord.value).toBeUndefined()
	})

	it('should set words and shuffle them', () => {
		const { shuffledEnWords, shuffledTlWords, matchedWordIdSet } = useMatchWords(sampleWords)

		expect(shuffledEnWords.value).toHaveLength(3)
		expect(shuffledTlWords.value).toHaveLength(3)
		expect(matchedWordIdSet.value.size).toBe(0)
		// Should not be the same reference as input
		expect(shuffledEnWords.value).not.toBe(sampleWords)
		expect(shuffledTlWords.value).not.toBe(sampleWords)
	})

	it('should select words and match correctly', async () => {
		const {
			shuffledEnWords,
			shuffledTlWords,
			matchedWordIdSet,
			selectWord,
			selectedEnWord,
			selectedTlWord,
		} = useMatchWords(sampleWords)
		// Select matching pair (dog/aso)
		const enDog = shuffledEnWords.value.find((w) => w.en === 'dog')!
		const tlAso = shuffledTlWords.value.find((w) => w.tl === 'aso')!
		selectWord(enDog, 'en')
		selectWord(tlAso, 'tl')
		await nextTick()
		expect(matchedWordIdSet.value.has(enDog.id)).toBe(true)
		expect(selectedEnWord.value).toBeUndefined()
		expect(selectedTlWord.value).toBeUndefined()
	})

	it('should not match if ids do not match', async () => {
		const {
			shuffledEnWords,
			shuffledTlWords,
			matchedWordIdSet,
			selectWord,
			selectedEnWord,
			selectedTlWord,
		} = useMatchWords(sampleWords)

		const enDog = shuffledEnWords.value.find((w) => w.en === 'dog')!
		const tlPusa = shuffledTlWords.value.find((w) => w.tl === 'pusa')!
		selectWord(enDog, 'en')
		selectWord(tlPusa, 'tl')
		await nextTick()
		expect(matchedWordIdSet.value.size).toBe(0)
		expect(selectedEnWord.value).toBeUndefined()
		expect(selectedTlWord.value).toBeUndefined()
	})

	it('should set isCompleted to true when all matched', async () => {
		const { shuffledEnWords, shuffledTlWords, selectWord, isCompleted } = useMatchWords(sampleWords)

		// Match all pairs
		for (const word of sampleWords.value) {
			const en = shuffledEnWords.value.find((w) => w.id === word.id)!
			const tl = shuffledTlWords.value.find((w) => w.id === word.id)!
			selectWord(en, 'en')
			selectWord(tl, 'tl')
			await nextTick()
		}
		expect(isCompleted.value).toBe(true)
	})

	it('should not allow selecting already matched words', async () => {
		const { shuffledEnWords, shuffledTlWords, selectWord, selectedEnWord } =
			useMatchWords(sampleWords)

		const enDog = shuffledEnWords.value.find((w) => w.en === 'dog')!
		const tlAso = shuffledTlWords.value.find((w) => w.tl === 'aso')!
		selectWord(enDog, 'en')
		selectWord(tlAso, 'tl')
		await nextTick()
		// Try to select again
		selectWord(enDog, 'en')
		expect(selectedEnWord.value).toBeUndefined()
	})
})
