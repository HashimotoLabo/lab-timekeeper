<template>
  <v-card>
    <v-card-title class="text-h5">ログ</v-card-title>
    <v-card-text>
      <v-data-table :items="logs" hide-default-header v-if="$vuetify.display.smAndDown">
        
        <template #item="{ item }">

            <p><strong>createdAt</strong> {{ item.createdAt }}</p>
            <p><strong>memo</strong>   {{ item.memo }}</p>
            <p> <strong>state</strong>  {{ item.state }}</p>
            <p> <strong>uid</strong>  {{ item.uid }}</p>
            <v-divider></v-divider>
        </template>
      </v-data-table>
      <v-data-table :items="logs" v-else>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type LogLocalType } from '@/features/database/types/LogsDB'

import { getQueryDocsFromLogsDB } from '@/features/database/composables/LogsDBService'

const logs = ref<LogLocalType[]>()

onMounted(async () => {
  logs.value = await getQueryDocsFromLogsDB(2)
})
</script>

<style scoped></style>
