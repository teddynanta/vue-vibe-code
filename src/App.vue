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
      title: title['title'],
      isDone: false,
      dueDate: title['dueDate'],
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
  }, { deep: true })

  const toggleDone = (id: number) => {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
      task.isDone = !task.isDone
    }
  }

  const deleteTask = (id: number) => {
    const index = tasks.value.findIndex(task => task.id === id)

    if (index !== -1 && confirm("Are you sure?")) {
      tasks.value.splice(index, 1)
    }
  }

  const editTask = (data) => {
    const editedTask = tasks.value.find(task => task.id === data.id)
    console.log('editedTask', data)
    if (editedTask) {
      editedTask.title = data.title
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
    } else {
      return tasks.value.filter(task => !task.isDone)
    }
  })

</script>

<template>
  <div>
    <main class="container">
      <h1 class="text-center gradient-neon">Vue Task Tracker</h1>
      <TaskForm @add-task="addTask" />
      <h2>filter : {{ filter }}</h2>
      <div class="d-flex flex-row">
        <div class="form-check me-3">
          <input class="form-check-input" type="radio" name="all" id="all" value="all" v-model="filter">
          <label class="form-check-label" for="all">
            All
          </label>
        </div>
        <div class="form-check me-3">
          <input class="form-check-input" type="radio" name="completed" id="completed" value="completed"
            v-model="filter">
          <label class="form-check-label" for="completed">
            Completed
          </label>
        </div>
        <div class="form-check me-3">
          <input class="form-check-input" type="radio" name="active" id="active" value="active" v-model="filter">
          <label class="form-check-label" for="active">
            Active
          </label>
        </div>
      </div>
      <TaskList :tasks="filteredTasks" @toggle-done="toggleDone" @delete-task="deleteTask" @edit-task="editTask" />
    </main>
  </div>
</template>

<style>

  /* Neon Cyberpunk */
  .gradient-neon {
    background: linear-gradient(90deg, #00d2ff, #3a7bd5, #ff0099, #00d2ff);
    background-clip: text;
    background-size: 150% 150%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    animation: gradientShift 4s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
</style>
