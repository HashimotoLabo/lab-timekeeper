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
</script>

<style scoped>
</style>
