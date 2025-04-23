<script setup lang="ts">
import type { Task } from '@/types/task'
import DeleteButton from './DeleteButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits<{
  (event: 'toggle-done', id: number): void
  (event: 'delete-task', id: number): void
}>()

defineProps<{
  task: Task
}>()
</script>

<template>
  <div>

    <span :class="{done : task.isDone}">
      <input type="checkbox" id="checkbox" :checked="task.isDone" @change="emit('toggle-done', task.id)">
      {{ task.title }}
      <!-- <button class="red" @click="emit('delete-task', task.id)"> delete </button> -->
      <!-- <DeleteButton  /> -->
      <FontAwesomeIcon @click="emit('delete-task', task.id)" :icon="fas.faTrash" class="red"/>
      
    </span>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
  color: gray;;
}

.red {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  /* margin-top: 5px; */
}
</style>
