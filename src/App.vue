<template>
  <div id="app">
    <div class="container mx-auto">
      <nav class="p-4">
        <router-link to="/">Flag Guessing Game</router-link> |
        <router-link to="/countries">Countries</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>