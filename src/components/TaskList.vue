<script setup lang="ts">
  import type { Task } from '@/types/task';
  import TaskItem from './TaskItem.vue';
  import { ref } from 'vue';
  import { type Priority } from '@/constants/PriorityMap';

  const props = defineProps<{
    tasks: Task[]
  }>();

  const sortBy = ref<'dueDate' | 'priority' | null>(null);
  const sortOrder = ref<'asc' | 'desc'>('asc');

  const handleSort = (key: 'dueDate' | 'priority') => {
    if (sortBy.value === key) {
      // Toggle asc/desc if same column clicked again
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      // Switch to new sort key and reset to ascending
      sortBy.value = key;
      sortOrder.value = 'asc';
    }
    emit('sort-by', key, sortOrder.value);
  };

  const emit = defineEmits<{
    (event: 'toggle-done', id: number): void
    (event: 'delete-task', id: number): void
    (event: 'edit-task', id: number, title: string, priority: Priority, date: Date): void
    (event: 'sort-by', key: 'dueDate' | 'priority', order: 'asc' | 'desc'): void
  }>();

</script>


<template>
  <table class="table table-striped table-bordered">
    <thead class="fw-bold fs-6 table-primary">
      <tr>
        <td scope="col">//</td>
        <td scope="col" @click="handleSort('priority')">
          Title
          <span v-if="sortBy === 'priority'">({{ sortOrder }})</span>
        </td>
        <td scope="col" @click="handleSort('dueDate')">
          Due Date
          <span v-if="sortBy === 'dueDate'">({{ sortOrder }})</span>
        </td>
        <td scope="col">Completed At</td>
        <td scope="col">Action</td>
      </tr>
    </thead>
    <tbody v-if="tasks.length > 0" class="table-group-divider">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @toggle-done="emit('toggle-done', $event)"
        @delete-task="emit('delete-task', $event)"
        @edit-task="(id, title, priority, date) => emit('edit-task', id, title, priority, date)" />
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="100%" class="text-center mt-5 fs-5 fst-italic"> No records. </td>
      </tr>
    </tbody>
  </table>
</template>
