<template>
    <div class="container flex-wrap text-center flex flex-col justify-items-center content-center mx-auto">
        <p class="pb-2">What Country is this flag?</p>
        <div class="img-holder flex justify-center">
            <img :src="flagUrl" alt="Country flag" width="540px" />
        </div>
        <div class="grid grid-cols-2 mt-6">
            <button 
                @click="submitGuess(country)" 
                v-for="(country, index) in randomizedCountries" 
                :key="index" 
                :data-country="country"
                :class="{'bg-green-100': guess === country && feedback === true, 'bg-red-100': guess === country && feedback === false}"
                class="bg-gray-100 m-2 rounded-xl p-5 text-center">
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
    width: 250px;
    max-width: 250px;
}

.img-holder {
    min-height: 340px;
    max-height: 340px;
    border: 1px solid #ddd;
    padding: 5px;
    background-color: #f9f9f9;
}
</style>