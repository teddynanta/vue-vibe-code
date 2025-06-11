<script setup lang="ts">
  import type { Task } from '@/types/task'
  import TaskItem from './TaskItem.vue'

  const props = defineProps<{
    tasks: Task[]
  }>()

  const emit = defineEmits<{
    (event: 'toggle-done', id: number): void
    (event: 'delete-task', id: number): void
    (event: 'edit-task', id: number, title: string): void
  }>()

</script>


<template>
  <table class="table">
    <thead>
      <tr>
        <td>//</td>
        <td>Title</td>
        <td>Due Date</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @toggle-done="emit('toggle-done', $event)"
        @delete-task="emit('delete-task', $event)" @edit-task="(id, title) => emit('edit-task', id, title)" />
    </tbody>
  </table>
</template>
