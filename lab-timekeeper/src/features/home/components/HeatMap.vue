<template>
  <v-card>
    <v-card-title text-h5>
      <v-select
        v-model="year"
        :items="[2024, 2025, 2026]"
        label="年"
        style="width: 100px; display: inline-block; margin-right: 8px"
        density="compact"
      />
      <v-select
        v-model="month"
        :items="monthItem"
        item-title="text"
        item-value="value"
        label="月"
        style="width: 80px; display: inline-block"
        density="compact"
      />
      のヒートマップ
    </v-card-title>
    <!-- <v-card-text>
      <div class="heatmap">
        <div v-for="(row, rowIndex) in heatmapData" :key="rowIndex" class="heatmap-row">
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="heatmap-cell"
            :style="{ backgroundColor: getColor(cell) }"
          >
            
            <span v-if="cell !== null">{{ rowIndex * cols + colIndex + 1 }}</span>
          </div>
        </div>
      </div>
    </v-card-text> -->
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getLogsByMonth } from '@/features/database/composables/LogsDBService'
import { getAllDocsFromUsersDB } from '@/features/database/composables/UsersDBService'

// 年・月の選択
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1) // 1〜12
const monthItem = ref([
  { text: '1月', value: 1 },
  { text: '2月', value: 2 },
  { text: '3月', value: 3 },
  { text: '4月', value: 4 },
  { text: '5月', value: 5 },
  { text: '6月', value: 6 },
  { text: '7月', value: 7 },
  { text: '8月', value: 8 },
  { text: '9月', value: 9 },
  { text: '10月', value: 10 },
  { text: '11月', value: 11 },
  { text: '12月', value: 12 },
])

// 月の日数を取得
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}
onMounted(async () => {
  daysInMonth.value = getDaysInMonth(year.value, month.value)
  const tmps = await getLogsByMonth(year.value, month.value)
  const users = await getAllDocsFromUsersDB()
  console.log('users', users)
  users.map((user) => {
    const userId = user.id
    const userLogs = tmps.filter((log) => log.uid === userId)
    console.log('userLogs', userLogs)
    const userDays = new Array(daysInMonth.value).fill(0)
    console.log('userDays', userDays.length)
    console.log('month', month.value)
    console.log('daysInMonth', daysInMonth.value)
    let time: null | Date = null
    let out: null | number = null
    userLogs.map((log) => {
      const date = new Date(log.createdAt)
      if (log.state === 1) {
        time = date
      } else if (log.state === 0) {
        if (time !== null) {
          userDays[time.getDate() - 1] = 24 - time.getHours()
          time = null
        }
        if (time === null) {
          out = date.getHours()
        } else {
          out = date.getHours() - time.getHours()
        }
        userDays[date.getDate() - 1] += out
        time = null
        out = null
      }
    })
    console.log('userDays', userDays)
  })
})

const cols = 7
const daysInMonth = ref(getDaysInMonth(year.value, month.value))
const rows = ref(Math.ceil(daysInMonth.value / cols))
const logs = ref(getLogsByMonth(year.value, month.value))

const heatmapData = ref<number[][]>([])

// // ヒートマップデータ生成
// function generateHeatmap() {
//   daysInMonth.value = getDaysInMonth(year.value, month.value)
//   rows.value = Math.ceil(daysInMonth.value / cols)
//   heatmapData.value = Array.from({ length: rows.value }, (_, row) =>
//     Array.from({ length: cols }, (_, col) => {
//       const day = row * cols + col + 1
//       return day <= daysInMonth.value ? Math.floor(Math.random() * 9) + 1 : null
//     }),
//   )
// }

// 年・月が変わったら再生成
watch(
  month,
  () => {
    // generateHeatmap()
    console.log('month changed', month.value, heatmapData.value)
  },
  { immediate: true },
)

function getColor(value: number | null) {
  if (value == null) return '#fff'
  const colors = [
    '#e0f7fa', // 1
    '#b2ebf2', // 2
    '#80deea', // 3
    '#4dd0e1', // 4
    '#26c6da', // 5
    '#00bcd4', // 6
    '#00acc1', // 7
    '#0097a7', // 8
    '#00838f', // 9
  ]
  return colors[value - 1] || '#fff'
}
</script>

<style scoped>
.heatmap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.heatmap-row {
  display: flex;
  gap: 2px;
}
.heatmap-cell {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  font-size: 14px;
  border-radius: 4px;
}
</style>
