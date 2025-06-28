import type { Text } from '~/database.types'

interface WordInfo {
	id: number
	word: string
}

type QuizStatus = 'selecting' | 'correct' | 'incorrect'

interface ReturnType {
	english: string
	words: ComputedRef<WordInfo[]>
	selectedWords: ComputedRef<WordInfo[]>
	status: ComputedRef<QuizStatus>
	selectWord: (word: WordInfo) => void
	deselectWord: (word: WordInfo) => void
}

const END_WITH_PUNCTUATION_REGEX = /[!.?]$/

function makeWords(text: string): WordInfo[] {
	let normalizedText = text.trim()

	if (END_WITH_PUNCTUATION_REGEX.test(normalizedText)) {
		normalizedText = normalizedText.slice(0, -1)
	}

	return normalizedText
		.split(' ')
		.filter((word) => word.length > 0)
		.map((word, index) => ({ id: index, word }))
}

export function useSentenceQuiz(text: Text): ReturnType {
	const english = text.en
	const correctWords = shuffle(makeWords(text.tl))

	const wordSet = ref(new Set(correctWords))
	const selectedWordSet = ref(new Set<WordInfo>())

	const words = computed(() => Array.from(wordSet.value))
	const selectedWords = computed(() => Array.from(selectedWordSet.value))

	const status = computed(() => {
		if (wordSet.value.size > 0) return 'selecting'

		for (let i = 0; i < correctWords.length; i++) {
			if (correctWords[i]?.word !== selectedWords.value[i]?.word) return 'incorrect'
		}

		return 'correct'
	})

	function selectWord(word: WordInfo): void {
		if (!wordSet.value.has(word)) return

		wordSet.value.delete(word)
		selectedWordSet.value.add(word)
	}

	function deselectWord(word: WordInfo): void {
		if (!selectedWordSet.value.has(word)) return

		selectedWordSet.value.delete(word)
		wordSet.value.add(word)
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
