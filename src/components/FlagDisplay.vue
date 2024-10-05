<template>
    <div class="flex flex-col items-center mx-auto text-center">
        <div class="img-holder flex justify-center">
            <img :src="flagUrl" alt="Country flag" width="100%" />
        </div>
        <div class="grid grid-cols-2 gap-4 w-full mt-6">
            <button 
                @click="submitGuess(country)" 
                v-for="(country, index) in randomizedCountries" 
                :key="index" 
                :data-country="country"
                :class="{'correct': guess === country && feedback === true, 'incorrect': guess === country && feedback === false}"
                class="bg-gray-100 m-2 rounded-xl p-5 text-center text-white">
                {{ country }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            randomizedCountries: []
        }
    },
    props: {
        flagUrl: String,
        possibleAnswers: Array,
        answer: String,
        feedback: Boolean,
    },
    methods: {
        submitGuess(countryGuess) {
            this.guess = countryGuess;
            this.$emit('submitGuess', countryGuess);
        },
        randomizeCountries() {
            console.log('randomize')
            const possibleAnswers = this.possibleAnswers;
            
            this.randomizedCountries = possibleAnswers.sort(shuffleArray);
            function shuffleArray() {
                return 0.5 - Math.random();
            }
        }
    },
    watch: {
        answer() {
            this.randomizeCountries();
        },  
        feedback() {
            console.log('Guess submited');
            console.log('your guess of ' + this.guess + ' was ' + this.feedback)
        }
    }
};  
</script>

<style scoped>
button {
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.54);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(3px);
    color: #FFF;
    -webkit-text-stroke-width: 1;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.15);
    font-family: Outfit;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

button.correct {
    border: 1px solid rgba(82, 189, 168, 0.50);
    color: #52BDA8;
}

button.incorrect {
    border: 1px solid rgba(156, 56, 72, 0.50);
    color: #9C3848;
}

.img-holder {
    min-height: 340px;
    max-height: 340px;
    /* border: 1px solid #ddd; */
    padding: 5px;
    /* background-color: #f9f9f9; */
}
</style>