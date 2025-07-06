import { shuffle } from '~/utils/shuffle.ts'

/**
 * Word type for the matching game
 */
export interface Word {
	id: string
	en: string
	tl: string
	selected?: boolean
}

interface UseMatchWordsReturn {
	/** Set of matched word IDs */
	matchedWordIdSet: Ref<Set<string>>
	/** Whether the game is completed */
	isCompleted: ComputedRef<boolean>
	/** Shuffled English words */
	shuffledEnWords: Ref<Word[]>
	/** Shuffled Tagalog words */
	shuffledTlWords: Ref<Word[]>
	/** Selected English word */
	selectedEnWord: Ref<Word | undefined>
	/** Selected Tagalog word */
	selectedTlWord: Ref<Word | undefined>
	/**
	 * Select word.
	 * This will check if the selected words match and update the matched word set.
	 */
	selectWord: (word: Word, language: 'en' | 'tl') => void
}

/**
 * A composable for the matching game.
 * @param words - The list of words to be matched.
 */
export function useMatchWords(words: Ref<Word[]>): UseMatchWordsReturn {
	/** Set of word IDs that a user correctly matched */
	const matchedWordIdSet = shallowRef<Set<string>>(new Set())
	const isCompleted = computed<boolean>(
		() => words.value.length > 0 && matchedWordIdSet.value.size === words.value.length,
	)
	const shuffledEnWords = shallowRef<Word[]>([])
	const shuffledTlWords = shallowRef<Word[]>([])
	const selectedEnWord = shallowRef<Word>()
	const selectedTlWord = shallowRef<Word>()

	function selectWord(word: Word, language: 'en' | 'tl'): void {
		// Skip if word is already matched
		if (matchedWordIdSet.value.has(word.id)) return

		if (language === 'en') {
			selectedEnWord.value = word
		} else {
			selectedTlWord.value = word
		}

		// Check if we have a pair selected
		if (selectedEnWord.value !== undefined && selectedTlWord.value !== undefined) {
			checkMatch()
		}
	}

	/**
	 * Check if selected words match
	 */
	function checkMatch(): void {
		if (!selectedEnWord.value || !selectedTlWord.value) return

		if (selectedEnWord.value.id === selectedTlWord.value.id) {
			// Match found
			matchedWordIdSet.value.add(selectedEnWord.value.id)
			triggerRef(matchedWordIdSet)
		}

		// Reset selections
		selectedEnWord.value = undefined
		selectedTlWord.value = undefined
	}

	watch(
		words,
		() => {
			shuffledEnWords.value = shuffle(words.value)
			shuffledTlWords.value = shuffle(words.value)
			matchedWordIdSet.value = new Set()
		},
		{ immediate: true },
	)

	return {
		matchedWordIdSet,
		isCompleted,
		shuffledEnWords,
		shuffledTlWords,
		selectedEnWord,
		selectedTlWord,
		selectWord,
	}
}
