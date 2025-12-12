<template>
  <div id="app">
    <TheNavbar />
    <router-view />
  </div>
</template>

<script setup>
import TheNavbar from './components/TheNavbar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: transparent;
  color: var(--text, #333);
}

#app {
  min-height: 100vh;
}
</style>
