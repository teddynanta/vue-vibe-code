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

const toggleDone = (id: number) => {
  const task = tasks.value.find(task => task.id === id)
  if (task){
    task.isDone = !task.isDone
  }
}
console.log('task', tasks.value)

</script>

<template>
  <div>
    <main class="container">
      <h1>Vue Task Tracker</h1>
      <TaskForm @add-task="addTask" @toggle-done="toggleDone"/>
      <TaskList :tasks="tasks" />
    </main>
  </div>
</template>

