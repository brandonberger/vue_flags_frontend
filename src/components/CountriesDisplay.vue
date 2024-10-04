<template>
    <div class="container mx-auto p-4">
        <div class="grid grid-cols-4 gap-4">
            <div v-for="(country, index) in sortedCountries" :key="index" class="bg-gray-100 rounded-xl p-10 text-center"> 
                <p class="text-lg text-gray-900">{{ country.name }} </p>
                <img :src="country.flag" height="30px"/>
            </div>
        </div>
    </div>
</template>

<script>

import { useCountries } from '../composables/useCountries';
import { onMounted, computed } from 'vue';

export default {
    setup() {
        const { countries, fetchCountries } = useCountries();
        onMounted(() => {
            fetchCountries();
        });

        const sortedCountries = computed(() => {
            return [...countries.value].sort((a, b) => a.name.localeCompare(b.name));
        });

        return {
            sortedCountries,
        };
    }
}
</script>