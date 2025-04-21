<script setup lang="ts">
import type { Task } from '@/types/task'
import TaskItem from './TaskItem.vue'

const props = defineProps<{
  tasks: Task[]
}>()
</script>

<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <TaskItem :task="task" />
    </li>
  </ul>
</template>
