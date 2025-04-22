<script setup lang="ts">
import type { Task } from '@/types/task'
import TaskItem from './TaskItem.vue'
import { onMounted, watch } from 'vue';

const props = defineProps<{
  tasks: Task[]
}>()

onMounted(() => {
  const storedTasks = localStorage.getItem('vue-tasks')
  if (storedTasks) {
    const newTasks = JSON.parse(storedTasks) as Task[]
    props.tasks.push(...newTasks)
  }
})

watch(() => props.tasks, (newTasks) => {
  console.log('tasks updated:', newTasks)
  localStorage.setItem('vue-tasks', JSON.stringify(newTasks))
}, { deep: true})

const emit = defineEmits<{
  (event: 'toggle-done', id: number): void
}>()
</script>

<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <TaskItem :task="task" @toggle-done="emit('toggle-done', $event)"/>
    </li>
  </ul>
</template>
