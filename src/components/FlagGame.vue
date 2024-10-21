<template>
	<GameOverModal 
		:correct="correct"
		:numberOfFlags="numberOfFlags"
		@submit-score-modal="toggleSubmitScoreModal"
		v-model:show="showGameOverModal"
		@reset-game="resetGame"
	/>
	<SubmitScoreModal
		:correct="correct"
		:numberOfFlags="numberOfFlags"
		@submit-score="submitScore"
		v-model:show="showSubmitScoreModal"
	/>
	<div class="flex-1 py-16">
		<div class="flex flex-col-reverse lg:flex-row">
			<div class="w-full lg:w-8/12 mt-10">
				<FlagDisplay
					@submitGuess="checkGuess"
					:feedback="feedback"
					:flagUrl="currentFlagUrl"
					:possibleAnswers="possibleAnswers"
					:answer="answer"
				/>
			</div>
			<div class="lg:w-1/12"></div>
			<div class="w-full lg:w-3/12 lg:mt-0 mt-10">
				<ScoreBoard
					:correct="correct"
					:numberOfFlags="numberOfFlags"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import FlagDisplay from './FlagDisplay.vue';
import ScoreBoard from './ScoreBoard.vue';
import GameOverModal from './GameOverModal.vue';
import SubmitScoreModal from './SubmitScoreModal.vue';

import { useCountries } from '../composables/useCountries';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
	components: {
		FlagDisplay,
		ScoreBoard,
		GameOverModal,
		SubmitScoreModal
	},
	setup() {
		const { countries, fetchCountries, randomizeCountries, getCountrySubSet } = useCountries();

		console.log(getCountrySubSet);


		const currentFlagUrl = ref('');
		const currentCountry = ref(null);
		const possibleAnswers = ref([]);
		const answer = ref('');
		const feedback = ref(null);
		const correct = ref(0);
		const wrong = ref(0);
		const numberOfFlags = ref(0);
		let currentFlagIndex = 0;

		const showSubmitScoreModal = ref(false);
		const showGameOverModal = ref(false);

		const getNextFlag = () => {
			feedback.value = null;
			currentCountry.value = countries.value[currentFlagIndex];
			currentFlagUrl.value = currentCountry.value.flag;
			answer.value = currentCountry.value.name;
			currentFlagIndex++;
		}

		const resetGame = () => {
			correct.value = 0;
			wrong.value = 0;
			currentFlagIndex = 0;
			feedback.value = true;

			showSubmitScoreModal.value = false;
			showGameOverModal.value = false;

			setTimeout(async () => {
				// For testing:
				await fetchCountries();
				randomizeCountries();
				// getCountrySubSet();
				numberOfFlags.value = countries.value.length;
				getNextFlag();
				getPossibleAnswers();
			}, 200);
		}

		const getPossibleAnswers = () => {
			possibleAnswers.value = [];
			for (let i = 0; i < 3; i++) {
				const randomIndex = Math.floor(Math.random() * countries.value.length);
				let randomCountry = countries.value[randomIndex];
				possibleAnswers.value.push(randomCountry.name);
			}
			possibleAnswers.value.push(answer.value);
		}

		const checkGuess = (guess) => {
			console.log('guess: ' + guess, 'answer: ' + answer.value);
			if (guess == answer.value) {
				correct.value++;
				feedback.value = true;
			} else {
				wrong.value++;
				feedback.value = false;
			}
			setTimeout(() => {
				if (!isGameOver()) {
					getNextFlag();
					getPossibleAnswers();
				} else {
					toggleGameOverModal();
				}
			}, 600);
		}

		const isGameOver = () => {
			console.log(currentFlagIndex, countries.value.length)
			if (currentFlagIndex == countries.value.length) {
				return true;
			} else {
				return false;
			}
		}

		const toggleGameOverModal = () => {
			showGameOverModal.value = !showGameOverModal.value;
		}

		const toggleSubmitScoreModal = () => {
			showGameOverModal.value = false;
			showSubmitScoreModal.value = !showSubmitScoreModal.value;
		}

		const submitScore = async (name, score) => {
			console.log(name);
			console.log(score);

			try {
				const response = await axios.post('http://localhost:8000/submit-score', {					method: 'POST',
					name: name,
					score: score
				});
				toggleSubmitScoreModal();
				resetGame();
				console.log('Sub success', response.data);
			} catch (error) {
				console.error(error);
			}

		}

		onMounted(async () =>  {
			await fetchCountries();
			console.log('wat', countries.value.length);
			randomizeCountries();
			// For Testing
			// getCountrySubSet();
			numberOfFlags.value = countries.value.length;
			getNextFlag();
			getPossibleAnswers();
		});

		return {
			countries,
			currentFlagUrl,
			currentCountry,
			possibleAnswers,
			answer,
			feedback,
			correct,
			numberOfFlags,
			wrong,
			getPossibleAnswers,
			checkGuess,
			toggleSubmitScoreModal,
			submitScore,
			showGameOverModal,
			showSubmitScoreModal,
			resetGame
		}
	}
}
</script>