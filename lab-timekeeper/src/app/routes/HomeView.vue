<template>
  <app-header />
  <v-main>
    <HomePage />
  </v-main>
</template>

<script setup lang="ts">
import HomePage from '@/features/home/pages/HomePage.vue'
import AppHeader from '@/components/layouts/AppHeader.vue'
</script>

<style scoped></style>
