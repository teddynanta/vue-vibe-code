<script setup lang="ts">
  import { ref } from 'vue';


  const title = ref('')
  const dueDate = ref('')
  const emit = defineEmits<{
    (event: 'add-task', title: string, dueDate: string): void;
  }>()

  const submit = () => {
    if (!title.value.trim() || !dueDate.value.trim()) {
      alert('Title and due date cannot be empty')
      return
    }
    emit('add-task', { title: title.value, dueDate: dueDate.value })
    title.value = ''
    dueDate.value = ''
  }

  function cancel() {
    title.value = ''
    dueDate.value = ''
  }
</script>
<template>
  <form @submit.prevent="submit">
    <input type="text" placeholder="add a task" v-model="title">
    <br>
    <input type="date" placeholder="add a due date" v-model="dueDate">
    <br>
    <button>Add</button>
    <button @click.prevent="cancel">cancel</button>
  </form>

</template>