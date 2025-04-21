<script setup lang="ts">
import { ref } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import type { Task } from './types/task';

const tasks = ref<Task[]>([])

const addTask = (title: string) => {
  const newTask: Task = {
    id: Date.now(),
    title,
    isDone: false,
  }
  tasks.value.push(newTask)
}

</script>

<template>
  <div>
    <main class="container">
      <h1>Vue Task Tracker</h1>
      <TaskForm @add-task="addTask" />
      <TaskList />
    </main>
  </div>
</template>

