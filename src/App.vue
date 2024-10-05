<template>
  <div id="app">
    <div class="min-h-screen container mx-auto flex px-8">
      <div class="flex lg:w-3/12">
        <nav class="flex flex-col mt-10 space-y-4">
          <router-link to="/">
            <span class="material-symbols-outlined"> quiz </span>
            Flag Guessing Game
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