<template>
	<div class="container mx-auto xl py-16">
		<div class="flex flex-col lg:flex-row">
			<div class="w-full lg:w-9/12">
				<FlagDisplay
					@submitGuess="checkGuess"
					:feedback="feedback"
					:flagUrl="currentFlagUrl"
					:possibleAnswers="possibleAnswers"
					:answer="answer"
				/>
			</div>
			<div class="w-full lg:w-3/12 lg:mt-0 mt-10">
				<ScoreBoard
					:correct="correct"
					:wrong="wrong"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import FlagDisplay from './FlagDisplay.vue';
import ScoreBoard from './ScoreBoard.vue';

import { useCountries } from '../composables/useCountries';
import { ref, onMounted } from 'vue';

export default {
	components: {
		FlagDisplay,
		ScoreBoard
	},
	setup() {
		const { countries, fetchCountries } = useCountries();

		const currentFlagUrl = ref('');
		const currentCountry = ref(null);
		const possibleAnswers = ref([]);
		const answer = ref('');
		const feedback = ref(null);
		const correct = ref(0);
		const wrong = ref(0);

		const getRandomFlag = () => {
			const randomIndex = Math.floor(Math.random() * countries.value.length);
			feedback.value = null;
			currentCountry.value = countries.value[randomIndex];
			currentFlagUrl.value = currentCountry.value.flag;
			answer.value = currentCountry.value.name;
		}

		const getPossibleAnswers = () => {
			console.log('Get possible answers');
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
				console.log('Yes!')
				feedback.value = true;
				setTimeout(() => {
					getRandomFlag();
					getPossibleAnswers();
				}, 600);
			} else {
				wrong.value++;
				feedback.value = false;
				setTimeout(() => {
					feedback.value = null;
					getRandomFlag();
					getPossibleAnswers();
				}, 600);
			}
		}

		onMounted(async () =>  {
			await fetchCountries();
			getRandomFlag();
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
			wrong,
			getRandomFlag,
			getPossibleAnswers,
			checkGuess
		}
	}
}
</script>