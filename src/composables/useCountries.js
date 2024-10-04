import { ref } from 'vue';
import axios from 'axios';

export function useCountries() {
    const countries = ref([]);

    const fetchCountries = async () => {
        try {
            // const response = await axios.get('https://restcountries.com/v3.1/all');
            const response = await axios.get("http://localhost:8000/countries");
            countries.value = response.data.countries;
        } catch (error) {
            console.error('Error fetching data.', error);
        }
    };

    return {
        countries,
        fetchCountries
    }
}