<script setup lang="ts">
  import type { Task } from '@/types/task';
  import TaskItem from './TaskItem.vue';

  const props = defineProps<{
    tasks: Task[]
  }>();

  const emit = defineEmits<{
    (event: 'toggle-done', id: number): void
    (event: 'delete-task', id: number): void
    (event: 'edit-task', id: number, title: string): void
  }>();

</script>


<template>
  <table class="table table-striped table-bordered">
    <thead class="fw-bold fs-6 table-primary">
      <tr>
        <td scope="col">//</td>
        <td scope="col">Title</td>
        <td scope="col">Due Date</td>
        <td scope="col">Completed At</td>
        <td scope="col">Action</td>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @toggle-done="emit('toggle-done', $event)"
        @delete-task="emit('delete-task', $event)" @edit-task="(id, title) => emit('edit-task', id, title)" />
    </tbody>
  </table>
</template>
