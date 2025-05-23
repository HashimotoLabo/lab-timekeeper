<template>
  <v-card>
    <v-card-title class="text-h5">
      <v-row>
        <v-col> ステータス </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6" v-for="(user, index) in users" :key="index">
            <v-card>
              <v-card-title>
                <v-row>
                  <v-col cols="3">
                    <v-icon icon="mdi-circle" :color="findUserState(user.id, true)"></v-icon>
                    {{ findUserState(user.id, false) }}
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-spacer></v-spacer>
                      <v-col class="text-center font-weight-bold text-h5">
                        <span>
                          {{ user.name }}
                        </span>
                      </v-col>
                      <v-spacer></v-spacer>
                    </v-row>
                    <v-row>
                      <v-col style="position: relative">
                        <v-icon
                          style="position: absolute; top: 20px; left: 100px; z-index: 1000"
                          icon="mdi-bell-ring"
                          color="white"
                          size="sx"
                        ></v-icon>
                        <v-btn variant="elevated" color="red" block rounded>呼び出し</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-title>
              <!-- <v-card-actions>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="4">
                    <v-btn prepend-icon="mdi-bell-ring" variant="elevated" color="red" block rounded
                      >呼び出し</v-btn
                    >
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type LogLocalType } from '@/features/database/types/LogsDB'

import { getQueryDocsFromLogsDB } from '@/features/database/composables/LogsDBService'
import { getAllDocsFromUsersDB } from '@/features/database/composables/UsersDBService'

const logs = ref<LogLocalType[]>()
const users = ref()

onMounted(async () => {
  logs.value = await getQueryDocsFromLogsDB(30)
  users.value = await getAllDocsFromUsersDB()
})

const findUserState = (userId: string, isColor: boolean): string => {
  const state = logs.value?.find((log) => log.uid == userId)?.state
  if (isColor) {
    switch (state) {
      case 0:
        return 'red'
      case 1:
        return 'green'
      case 2:
        return 'yellow'
      default:
        return 'red'
    }
  } else {
    switch (state) {
      case 0:
        return '不在'
      case 1:
        return '在室'
      case 2:
        return '外出'
      default:
        return '不在'
    }
  }
}
</script>

<style scoped></style>
