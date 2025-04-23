<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
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

onMounted(() => {
  try {
    const storedTasks = localStorage.getItem('vue-tasks')
    if (storedTasks) {
      tasks.value = JSON.parse(storedTasks) as Task[]
    }
  } catch (error) {
    console.error('Error parsing tasks from localStorage:', error)
    tasks.value = []
  }
})

watch(tasks, (newTasks) => {
  console.log('tasks updated:', newTasks)
  localStorage.setItem('vue-tasks', JSON.stringify(newTasks))
}, {deep:true})

const toggleDone = (id: number) => {
  const task = tasks.value.find(task => task.id === id)
  if (task){
    task.isDone = !task.isDone
  }
}

const deleteTask = (id: number) => {
  const index = tasks.value.findIndex(task => task.id === id)

  if (index !== -1 && confirm("Are you sure?")) {
    tasks.value.splice(index,1)
  }
}

const editTask = (id: number, title: string) => {
  const editedTask = tasks.value.find(task => task.id === id)
  if (editedTask){
    editedTask.title = title
  }
}

// const editTask = (id: number, title: string) => {
//   const editedTask = tasks.value.find(task => task.id === id)
//   if (editedTask) {
//     editedTask.title = title
//   }
// }

const filteredTasks = computed(() => {
  if (filter.value === 'all') {
    return tasks.value
  } else if (filter.value === 'completed') {
    return tasks.value.filter(task => task.isDone)
  }else{
    return tasks.value.filter(task => !task.isDone)
  }
})

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

      <TaskList :tasks="filteredTasks" @toggle-done="toggleDone"  @delete-task="deleteTask" @edit-task="editTask"/>
    </main>
  </div>
</template>

