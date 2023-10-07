import { describe, expect, it } from 'bun:test'
import { useSentenceQuiz } from './useSentenceQuiz'

describe('useSentenceQuiz', () => {
	const text = {
		id: '1',
		en: 'Perhaps Armany can solve this problem.',
		tl: 'Siguro malulutas ni Armany ang problemang ito.',
		youtube_id: '1',
	}

	it('should return the correct english', () => {
		const { english } = useSentenceQuiz(text)
		expect(english).toBe(text.en)
	})

	it('should return the correct words', () => {
		const { words } = useSentenceQuiz(text)
		expect(words.value).toEqual([
			{ id: 0, word: 'Siguro' },
			{ id: 1, word: 'malulutas' },
			{ id: 2, word: 'ni' },
			{ id: 3, word: 'Armany' },
			{ id: 4, word: 'ang' },
			{ id: 5, word: 'problemang' },
			{ id: 6, word: 'ito.' },
		])
	})

	it('should return the correct selected words', () => {
		const { selectedWords } = useSentenceQuiz(text)
		expect(selectedWords.value).toEqual([])
	})

	it('should return the correct status', () => {
		const { status } = useSentenceQuiz(text)
		expect(status.value).toBe('selecting')
	})

	it('should select a word', () => {
		const { selectWord, words, selectedWords, status } = useSentenceQuiz(text)
		selectWord(words.value[0]!)
		expect(selectedWords.value).toEqual([words.value[0]])
		expect(status.value).toBe('selecting')
	})

	it('should deselect a word', () => {
		const { selectWord, deselectWord, words, selectedWords, status } = useSentenceQuiz(text)
		selectWord(words.value[0]!)
		deselectWord(words.value[0]!)
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
