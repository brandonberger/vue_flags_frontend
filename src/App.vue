<template>
  <div id="app">
    <div class="min-h-screen container mx-auto flex flex-col lg:flex-row px-8">
      <div class="flex lg:w-3/12 sm:w-12/12">
        <nav class="flex flex-col mt-10 space-y-4">
          <router-link to="/">
            <span class="material-symbols-outlined"> quiz </span>
            Flag Guessing Game
          </router-link>
          <router-link to="/leaderboard">
            <span class="material-symbols-outlined"> leaderboard </span>
            Leaderboard
          </router-link>
          <router-link to="/countries">
            <span class="material-symbols-outlined"> flag </span>
            View All Flags
          </router-link>
        </nav>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>