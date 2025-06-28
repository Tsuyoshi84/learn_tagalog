import { nextTick } from 'vue'
import { useMatchWords } from './useMatchWords.ts'

const sampleWords = [
	{ id: '1', en: 'dog', tl: 'aso' },
	{ id: '2', en: 'cat', tl: 'pusa' },
	{ id: '3', en: 'bird', tl: 'ibon' },
]

describe('useMatchWords', () => {
	it('should initialize with empty state', () => {
		const match = useMatchWords()
-		expect(match.matchedWordIdSet.value).toHaveLength(0)
+		expect(match.matchedWordIdSet.value.size).toBe(0)
		expect(match.isCompleted.value).toBe(false)
		expect(match.shuffledEnWords.value).toHaveLength(0)
		expect(match.shuffledTlWords.value).toHaveLength(0)
		expect(match.selectedEnWord.value).toBeUndefined()
		expect(match.selectedTlWord.value).toBeUndefined()
	})
})

	it('should set words and shuffle them', () => {
		const match = useMatchWords()
		match.setWords(sampleWords)
		expect(match.shuffledEnWords.value).toHaveLength(3)
		expect(match.shuffledTlWords.value).toHaveLength(3)
		expect(match.matchedWordIdSet.value).toHaveLength(0)
		// Should not be the same reference as input
		expect(match.shuffledEnWords.value).not.toBe(sampleWords)
		expect(match.shuffledTlWords.value).not.toBe(sampleWords)
	})

	it('should select words and match correctly', async () => {
		const match = useMatchWords()
		match.setWords(sampleWords)
		// Select matching pair (dog/aso)
		const enDog = match.shuffledEnWords.value.find((w) => w.en === 'dog')!
		const tlAso = match.shuffledTlWords.value.find((w) => w.tl === 'aso')!
		match.selectWord(enDog, 'en')
		match.selectWord(tlAso, 'tl')
		await nextTick()
		expect(match.matchedWordIdSet.value.has(enDog.id)).toBe(true)
		expect(match.selectedEnWord.value).toBeUndefined()
		expect(match.selectedTlWord.value).toBeUndefined()
	})

	it('should not match if ids do not match', async () => {
		const match = useMatchWords()
		match.setWords(sampleWords)
		const enDog = match.shuffledEnWords.value.find((w) => w.en === 'dog')!
		const tlPusa = match.shuffledTlWords.value.find((w) => w.tl === 'pusa')!
		match.selectWord(enDog, 'en')
		match.selectWord(tlPusa, 'tl')
		await nextTick()
		expect(match.matchedWordIdSet.value.size).toBe(0)
		expect(match.selectedEnWord.value).toBeUndefined()
		expect(match.selectedTlWord.value).toBeUndefined()
	})

	it('should set isCompleted to true when all matched', async () => {
		const match = useMatchWords()
		match.setWords(sampleWords)
		// Match all pairs
		for (const word of sampleWords) {
			const en = match.shuffledEnWords.value.find((w) => w.id === word.id)!
			const tl = match.shuffledTlWords.value.find((w) => w.id === word.id)!
			match.selectWord(en, 'en')
			match.selectWord(tl, 'tl')
			await nextTick()
		}
		expect(match.isCompleted.value).toBe(true)
	})

	it('should not allow selecting already matched words', async () => {
		const match = useMatchWords()
		match.setWords(sampleWords)
		const enDog = match.shuffledEnWords.value.find((w) => w.en === 'dog')!
		const tlAso = match.shuffledTlWords.value.find((w) => w.tl === 'aso')!
		match.selectWord(enDog, 'en')
		match.selectWord(tlAso, 'tl')
		await nextTick()
		// Try to select again
		match.selectWord(enDog, 'en')
		expect(match.selectedEnWord.value).toBeUndefined()
	})
})
