<template>
  <v-app-bar>
    <v-toolbar-title class="text-h4">Hashimoto Lab.</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="router.push('/home')">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import router from '@/app/router'
import { signOut } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
const logout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
</script>

<style scoped></style>
