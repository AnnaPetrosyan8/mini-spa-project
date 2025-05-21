
<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
}

.app-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}
</style>