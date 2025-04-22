<script setup lang="ts">
import type { Task } from '@/types/task'
import { ref } from 'vue';


const emit = defineEmits<{
  (event: 'toggle-done', id: number): void
}>()

defineProps<{
  task: Task
}>()
</script>

<template>
  <div>

    <span>
      <input type="checkbox" id="checkbox" :checked="task.isDone" @change="emit('toggle-done', task.id)">
      {{ task.title }}
    </span>
  </div>
</template>
