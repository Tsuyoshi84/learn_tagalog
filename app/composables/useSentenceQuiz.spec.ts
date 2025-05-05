import { describe, expect, it } from 'vitest'
import { useSentenceQuiz } from './useSentenceQuiz.ts'

describe('useSentenceQuiz', () => {
	const text = {
		id: '1',
		en: 'Perhaps Armany can solve this problem.',
		tl: 'Siguro malulutas ni Armany ang problemang ito.',
	}

	it('should return the correct english', () => {
		const { english } = useSentenceQuiz(text)
		expect(english).toBe(text.en)
	})

	it('should return the correct words', () => {
		const { words } = useSentenceQuiz(text)
		expect(words.value.length).toBe(7)
	})

	it('should return the correct selected words', () => {
		const { selectedWords } = useSentenceQuiz(text)
		expect(selectedWords.value).toEqual([])
	})

	it('should return the correct status', () => {
		const { status } = useSentenceQuiz(text)
		expect(status.value).toBe('selecting')
	})

	it('should store selected words after selecting', () => {
		const { selectWord, words, selectedWords, status } = useSentenceQuiz(text)
		const word1 = words.value[0]!
		const word2 = words.value[2]!

		selectWord(word1)
		selectWord(word2)

		expect(selectedWords.value).toEqual([word1, word2])
		expect(status.value).toBe('selecting')
	})

	it('should lose selected words after deselecting', () => {
		const { selectWord, deselectWord, words, selectedWords, status } = useSentenceQuiz(text)
		const word1 = words.value[0]!
		const word2 = words.value[2]!

		selectWord(word1)
		selectWord(word2)
		deselectWord(word1)
		deselectWord(word2)

		expect(selectedWords.value).toEqual([])
		expect(status.value).toBe('selecting')
	})

	it('should return correct status when all words are selected', () => {
		const { selectWord, words, status } = useSentenceQuiz(text)
		for (const word of words.value) {
			selectWord(word)
		}
		expect(status.value).toBe('correct')
	})

	it('should return incorrect status when all words are selected but not in the correct order', () => {
		const { selectWord, words, status } = useSentenceQuiz(text)
		for (let i = words.value.length - 1; i >= 0; i--) {
			selectWord(words.value[i]!)
		}
		expect(status.value).toBe('incorrect')
	})
})
