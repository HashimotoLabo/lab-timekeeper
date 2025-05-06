<template>
  <v-container height="100%" class="d-flex align-center">
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <login-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import LoginCard from '../components/LoginCard.vue'
</script>

<style scoped></style>
