type ReturnType = {
	/** Whether Filipino voice is available or not */
	available: Ref<boolean>
	/** Speak text */
	speak: (text: string) => void
}

type Options = {
	/** Volume of the voice */
	volume?: number
	/** Rate of the voice */
	rate?: number
	/** Pitch of the voice */
	pitch?: number
}

export function useSpeech(options: Options = {}): ReturnType {
	const { volume = 1, rate = 1, pitch = 1 } = options

	function getVoices(): SpeechSynthesisVoice[] {
		return speechSynthesis.getVoices().filter((v) => v.lang.includes('fil-PH'))
	}

	const available = computed(() => {
		if (process.server) return false

		return getVoices().length > 0
	})

	function speak(text: string): void {
		const voices = getVoices()
		assertHasAtLeast(voices, 1, 'No Filipino voice is available.')

		var utterance = new SpeechSynthesisUtterance(text)

		utterance.volume = volume
		utterance.rate = rate
		utterance.pitch = pitch
		utterance.voice = voices[0]

		window.speechSynthesis.speak(utterance)
	}

	return {
		available,
		speak,
	}
}
