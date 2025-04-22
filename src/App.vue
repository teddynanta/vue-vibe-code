<script setup lang="ts">
import { computed, ref } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import type { Task } from './types/task';

const tasks = ref<Task[]>([]);
const filter = ref<'active' | 'completed' | 'all'>('all');

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

const filteredTasks = computed(() => {
  if (filter.value === 'all') {
    return tasks.value
  } else if (filter.value === 'completed') {
    return tasks.value.filter(task => task.isDone)
  }else{
    return tasks.value.filter(task => !task.isDone)
  }
})
// console.log('task', tasks.value)

</script>

<template>
  <div>
    <main class="container">
      <h1>Vue Task Tracker</h1>
      <TaskForm @add-task="addTask" />
      <h2>filter : {{ filter }}</h2>
      <input type="radio" id="all" value="all" v-model="filter" />
      <label for="all">all</label>

      <input type="radio" id="completed" value="completed" v-model="filter" />
      <label for="completed">completed</label>

      <input type="radio" id="active" value="active" v-model="filter" />
      <label for="active">active</label>

      <TaskList :tasks="filteredTasks" @toggle-done="toggleDone"/>
    </main>
  </div>
</template>

