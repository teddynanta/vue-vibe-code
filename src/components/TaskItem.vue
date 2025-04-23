<script setup lang="ts">
import type { Task } from '@/types/task'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import TaskList from './TaskList.vue';

const emit = defineEmits<{
  (event: 'toggle-done', id: number): void
  (event: 'delete-task', id: number): void
  (event: 'edit-task', id: number, title: string): void
}>()

const isEditing = ref(false)
const editTitle = ref('')

function editTask(title: string) {
  isEditing.value = !isEditing.value
  editTitle.value = title
  console.log('isEditing', isEditing.value)
} 

function submitEdit(id: number) {
  if (!editTitle.value.trim()) return
  emit('edit-task', {id: id, title: editTitle.value})
  editTitle.value = ''
  isEditing.value = false
}

defineProps<{
  task: Task
}>()
</script>

<template>
  <div>
    <span v-if="isEditing">
      <form @submit.prevent="submitEdit(task.id)">
        <input type="text" v-model="editTitle" placeholder="edit task" />
        <button class="green" type="submit">save</button>
        <button @click.prevent="editTask" class="red">cancel</button>
      </form>
    </span>
    <span v-else :class="{done : task.isDone}">
      <input type="checkbox" id="checkbox" :checked="task.isDone" @change="emit('toggle-done', task.id)">
      {{ task.title }}      
      <FontAwesomeIcon @click="emit('delete-task', task.id)" :icon="fas.faTrash" class="red"/>
      <FontAwesomeIcon @click="editTask(task.title)" :icon="fas.faPencil" class="yellow"/>
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

.yellow {
  background-color: #f7e41d;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.green {
  background-color: green;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
