<template>
  <v-card>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab :value="1">ログ</v-tab>
      <v-tab :value="2">ヒートマップ</v-tab>
      <v-tab :value="3">週間グラフ</v-tab>
      <v-tab :value="4">ステータス</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <v-container>
          <log-card />
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :value="2"> ヒートマップ </v-tabs-window-item>
      <v-tabs-window-item :value="3"> グラフ </v-tabs-window-item>
      <v-tabs-window-item :value="4">
        <v-container>
          <user-status />
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import LogCard from '../components/LogCard.vue'
import UserStatus from '../components/UserStatus.vue'

const tab = ref(4)
</script>

<style scoped></style>
