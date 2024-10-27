<template>
    <div class="container mx-auto p-4">
        <h1 class="text-white mt-10 text-3xl mb-7">Leaderboard</h1>
        <div class="row flex border-gray-100 border-solid border-2 rounded-t-2xl">
            <div class="text-white flex-1 font-bold">#</div> <div class="text-white flex-1 font-bold">Name</div> <div class="font-bold flex-1 text-white">Score</div>
        </div>
        <div v-for="(row, index) in scoreEntries" :key="index" class="row flex border-gray-100 border-solid border-2">
            <div class="text-gray-300 flex-1">{{ index + 1 }}</div><div class="text-gray-300 flex-1">{{ row.name }}</div> <div class="flex-1 text-gray-300">{{ row.score }} / 250</div>
        </div>
    </div>
    
</template>



<script>

import {ref, onMounted} from 'vue';
import axios from 'axios';

export default {
    
    setup() {
        let scoreEntries = ref([]);

        onMounted(async () => {
            try {
                // const response = await axios.get('https://restcountries.com/v3.1/all');
                const response = await axios.get("http://localhost:8000/get-scores");
                console.log(response.data.scores);
                scoreEntries.value = response.data.scores;
            } catch (error) {
                console.error('Error fetching data.', error);
            }
        });

        return {
            scoreEntries
        }
    }
}

</script>


<style scoped>
    .row {
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(0, 0, 0, 0.54);
        /* border-radius: 12px; */
        padding: 16px;

    }
</style>