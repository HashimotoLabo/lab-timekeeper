<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Email" v-model="email" />
              <v-text-field label="Password" type="password" v-model="password" />
              <v-btn @click="login">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '@/plugins/firebase'

import { signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    console.log('User logged in:', user)
    alert('Login successful!')
  } catch (error) {
    console.error('Error logging in:', error)
  }
}
</script>

<style scoped></style>
