<script setup lang="ts">
import { ref } from 'vue';


const title = ref('');
const emit = defineEmits<{
  (event: 'add-task', title: string): void;
}>()

const submit = () => {
  if (!title.value.trim()) return
  emit('add-task', title.value)
  title.value = ''
}

function cancel() {
  title.value = ''
}
</script>
<template>
  <form @submit.prevent="submit">
    <input type="text" placeholder="add a task" v-model="title">
    <button>Add</button>
    <button @click.prevent="cancel">cancel</button>
  </form>

</template>