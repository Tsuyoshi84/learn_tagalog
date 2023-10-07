import { computed } from 'vue'
import { Text } from '~/database.types'

type WordInfo = {
	id: number
	word: string
}

type QuizStatus = 'selecting' | 'correct' | 'incorrect'

type ReturnType = {
	english: string
	words: ComputedRef<WordInfo[]>
	selectedWords: ComputedRef<WordInfo[]>
	status: ComputedRef<QuizStatus>
	selectWord: (word: WordInfo) => void
	deselectWord: (word: WordInfo) => void
}

function makeWords(text: string): WordInfo[] {
	return text
		.trim()
		.split(' ')
		.filter((word) => word.length > 0)
		.map((word, index) => ({ id: index, word }))
}

export function useSentenceQuiz(text: Text): ReturnType {
	const english = text.en
	const correctWords = makeWords(text.tl)

	const wordSet = new Set(correctWords)
	const selectedWordSet = new Set<WordInfo>()

	const words = computed(() => Array.from(wordSet))
	const selectedWords = computed(() => Array.from(selectedWordSet))

	const status = computed(() => {
		if (wordSet.size > 0) return 'selecting'

		for (let i = 0; i < correctWords.length; i++) {
			if (correctWords[i]?.word !== selectedWords.value[i]?.word) return 'incorrect'
		}

		return 'correct'
	})

	function selectWord(word: WordInfo) {
		if (!wordSet.has(word)) return

		wordSet.delete(word)
		selectedWordSet.add(word)
	}

	function deselectWord(word: WordInfo) {
		if (!selectedWordSet.has(word)) return

		selectedWordSet.delete(word)
		wordSet.add(word)
	}

	return {
		english,
		words,
		selectedWords,
		status,
		selectWord,
		deselectWord,
	}
}
