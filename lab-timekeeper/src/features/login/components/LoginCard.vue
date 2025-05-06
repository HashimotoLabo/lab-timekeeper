<template>
  <v-card rounded="lg" elevation="10">
    <v-card-title class="text-center text-h4">Hashimoto Lab.</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-inner-icon="mdi-email"
          label="Email"
          v-model="email"
          autocomplete="email"
          variant="outlined"
          rounded
          clearable
        />
        <v-text-field
          prepend-inner-icon="mdi-key-outline"
          :append-inner-icon="hidePassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="hidePassword = !hidePassword"
          :type="hidePassword ? 'password' : 'text'"
          label="Password"
          v-model="password"
          autocomplete="current-password"
          variant="outlined"
          rounded
          clearable
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn rounded class="bg-primary" block @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import router from '@/app/router'

import { auth } from '@/plugins/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const hidePassword = ref(true)
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    router.push('/home')
  } catch (error) {
    // console.error('Error logging in:', error)
  }
}
</script>

<style scoped></style>
