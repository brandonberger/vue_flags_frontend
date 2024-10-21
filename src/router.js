import { createRouter, createWebHistory } from 'vue-router';
import FlagGame from './components/FlagGame.vue';
import CountriesDisplay from './components/CountriesDisplay.vue';
import LeaderboardDisplay from './components/LeaderboardDisplay.vue';

const routes = [
    {
        path: '/',
        name: 'FlagGame',
        component: FlagGame
    },
    {
        path: '/countries',
        name: 'CountriesDisplay',
        component: CountriesDisplay
    },
    {
        path: '/leaderboard',
        name: 'LeaderboardDisplay',
        component: LeaderboardDisplay
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;