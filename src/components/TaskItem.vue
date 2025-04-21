<script setup lang="ts">
import type { Task } from '@/types/task'

defineProps<{
  task: Task
}>()
</script>

<template>
  <div>
    <span>{{ task.title }}</span>
  </div>
</template>
