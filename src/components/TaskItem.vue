<script setup lang="ts">
  import type { Task } from '@/types/task';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { fas } from '@fortawesome/free-solid-svg-icons';
  import { nextTick, ref, watch } from 'vue';


  const inputRef = ref<HTMLInputElement | null>(null);

  const isEditing = ref(false);
  const editTitle = ref('');

  const props = defineProps<{ task: Task }>();

  watch(isEditing, async (val) => {
    if (val) {
      await nextTick()
      inputRef.value?.focus()
    }
  });
  const emit = defineEmits<{
    (event: 'toggle-done', id: number): void
    (event: 'delete-task', id: number): void
    (event: 'edit-task', id: number, title: string): void
  }>();


  function editTask(title: string) {
    isEditing.value = !isEditing.value
    editTitle.value = title
    console.log('isEditing', isEditing.value)
  };

  function submitEdit(id: number) {
    if (!editTitle.value.trim()) {
      alert('Title cannot be empty')
      return
    };
    emit('edit-task', id, editTitle.value)
    editTitle.value = ''
    isEditing.value = !isEditing.value
  };


</script>

<template>
  <tr v-if="isEditing">
    <td>//</td>
    <td>
      <input ref="inputRef" type="text" v-model="editTitle" placeholder="edit task" />
    </td>
    <td>
      <span>{{ task.dueDate ? task.dueDate : 'No due date' }}</span>
    </td>
    <td>
      <span>{{ task.completedAt ? task.completedAt : 'Not completed yet.' }}</span>
    </td>
    <td>
      <button @click.prevent="submitEdit(task.id)" class="green" type="submit">save</button>
      <button @click.prevent="editTask(task.title)" class="red">cancel</button>
    </td>
  </tr>
  <tr v-else :class="{ done: task.isDone }">
    <td>
      <input type="checkbox" :checked="task.isDone" @change="emit('toggle-done', task.id)">
    </td>
    <td>
      <span class="me-1 fs-5 fw-normal">{{ task.title }}</span>
      <span class="badge rounded-pill fw-medium"
        :class="{ 'text-bg-info': task.priority == 'low', 'text-bg-warning': task.priority == 'medium', 'text-bg-danger': task.priority == 'high', 'text-bg-secondary': task.priority == null }">
        {{ task.priority ? task.priority : 'Not classified yet.' }}
      </span>
    </td>
    <td>
      <span>{{ task.dueDate ? task.dueDate : 'No due date' }}</span>
    </td>
    <td>
      <span>{{ task.completedAt ? task.completedAt : 'Not completed yet.' }}</span>
    </td>
    <td v-if="task.isDone">
      <FontAwesomeIcon @click="emit('delete-task', task.id)" :icon="fas.faTrash" class="red" />
      <FontAwesomeIcon :icon="fas.faCheck" class="green cursor-default" />
    </td>
    <td v-else>
      <FontAwesomeIcon @click="emit('delete-task', task.id)" :icon="fas.faTrash" class="red" />
      <FontAwesomeIcon @click="editTask(task.title)" :icon="fas.faPencil" class="yellow" />
    </td>
  </tr>
</template>

<style>
  .done span {
    text-decoration: line-through;
    color: grey !important;
  }

  .cursor-default {
    cursor: default !important;
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

  .green {
    background-color: green;
    color: white;
    border: none;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    /* margin-top: 5px; */
  }

  input[type=text]:focus {
    border: 1px solid cadetblue;
    border-radius: 5px;
    outline: none;
  }

  .yellow {
    background-color: gold;
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
