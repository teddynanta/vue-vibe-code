<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import TaskForm from './components/TaskForm.vue';
  import TaskList from './components/TaskList.vue';
  import type { Task } from './types/task';
  import TaskFilter from './components/TaskFilter.vue';

  const tasks = ref<Task[]>([]);
  const filter = ref<'active' | 'completed' | 'all'>('all');
  const searchQuery = ref<string>('');
  const date = new Date();
  const sortBy = ref<'dueDate' | 'priority' | null>(null);
  const sortOrder = ref<'asc' | 'desc'>('asc');
  const priorityOrder = { high: 3, medium: 2, low: 1, null: 0 };
  const formatter = new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDateTime = formatter.format(date);

  const handleSort = (key: 'dueDate' | 'priority', order: 'asc' | 'desc') => {
    sortBy.value = key;
    sortOrder.value = order;
  }

  const sortedTask = computed(() => {
    let task = [...filteredTasks.value];
    if (sortBy.value == 'dueDate') {
      return task.sort((a, b) => {
        return sortOrder.value == 'asc' ? new Date(a.dueDate ?? '').getTime() - new Date(b.dueDate ?? '').getTime() : new Date(b.dueDate ?? '').getTime() - new Date(a.dueDate ?? '').getTime();
      });
    } else if (sortBy.value == 'priority') {
      return task.sort((a, b) => {
        return sortOrder.value == 'asc' ? priorityOrder[b.priority] - priorityOrder[a.priority] : priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
    return task;
  });

  const addTask = (title: string, dueDate: Date, priority: 'low' | 'medium' | 'high') => {
    const newTask: Task = {
      id: Date.now(),
      title,
      isDone: false,
      dueDate,
      completedAt: null,
      priority
    };
    tasks.value.push(newTask);
  };

  onMounted(() => {
    try {
      const storedTasks = localStorage.getItem('vue-tasks')
      if (storedTasks) {
        tasks.value = JSON.parse(storedTasks).map((task: Task[]) => ({
          ...task,
          dueDate: new Date(task.dueDate)
        })) as Task[];
      };
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      tasks.value = [];
    };
  });

  watch(tasks, (newTasks) => {
    console.log('tasks updated:', newTasks);
    localStorage.setItem('vue-tasks', JSON.stringify(newTasks));
  }, { deep: true });

  const toggleDone = (id: number) => {
    const task = tasks.value.find(task => task.id === id);
    if (task && task.completedAt != null) {
      task.isDone = !task.isDone;
      task.completedAt = null;
    } else if (task && task.completedAt == null) {
      task.isDone = !task.isDone;
      task.completedAt = formattedDateTime;
    };
  };

  const deleteTask = (id: number) => {
    const index = tasks.value.findIndex(task => task.id === id);

    if (index !== -1 && confirm("Are you sure?")) {
      tasks.value.splice(index, 1);
    };
  };

  const editTask = (id: number, title: string, priority: 'low' | 'medium' | 'high', date: Date) => {
    const editedTask = tasks.value.find(task => task.id === id);
    console.log('editedTask', title);
    if (editedTask) {
      editedTask.title = title;
      editedTask.priority = priority;
      editedTask.dueDate = date;
    };
  };

  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const matchesFilter =
        filter.value === 'all' ||
        (filter.value === 'completed' && task.isDone) ||
        (filter.value === 'active' && !task.isDone);

      const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  });

  const handleFilter = (value: 'active' | 'completed' | 'all') => {
    filter.value = value;
  };
  const handleSearch = (query: string) => {
    searchQuery.value = query;
  };

  console.log(tasks.value);

</script>

<template>
  <div>
    <main class="container">
      <h1 class="text-center gradient-neon">Vue Task Tracker</h1>
      <TaskForm @add-task="addTask" />
      <h2>filter : {{ filter }}</h2>
      <TaskFilter @filter-button="handleFilter" @search-query="handleSearch" />
      <TaskList :tasks="sortedTask" @toggle-done="toggleDone" @delete-task="deleteTask" @edit-task="editTask"
        @sort-by="handleSort" />
    </main>
  </div>
</template>

<style>
  main {
    margin-bottom: 100% !important;
  }

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
