<template>
  <v-card>
    <v-card-title class="text-h5">Log</v-card-title>
    <v-card-text>
      <v-data-table :items="logs"></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getQueryDocsFromLogsDB } from '@/features/database/composables/LogsDBService'

const logs = ref()

onMounted(async () => {
  logs.value = await getQueryDocsFromLogsDB(7)
  console.log('logs', logs.value)
})
</script>

<style scoped></style>
