<script setup lang="ts">
import type { Task } from '@/types/task'
import TaskItem from './TaskItem.vue'

const props = defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  (event: 'toggle-done', id: number): void
  (event: 'delete-task', id: number): void
}>()
</script>


<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <TaskItem :task="task" @toggle-done="emit('toggle-done', $event)" @delete-task="emit('delete-task', $event)"/>
    </li>
  </ul>
</template>
