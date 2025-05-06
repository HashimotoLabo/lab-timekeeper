<template>
  <v-main class="login-background">
    <LoginPage />
  </v-main>
</template>

<script setup lang="ts">
import LoginPage from '@/features/login/pages/LoginPage.vue'
</script>

<style scoped>
.login-background {
  background-image: url('https://images.pexels.com/photos/4321501/pexels-photo-4321501.jpeg'); /* 適切な画像パスに変更してください */
  background-size: cover;
  background-position: center;
}
</style>
