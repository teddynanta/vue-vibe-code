<script setup lang="ts">
  import { ref } from 'vue';


  const title = ref('');
  const dueDate = ref<Date>();
  const priority = ref<'low' | 'medium' | 'high'>('low');
  const emit = defineEmits<{
    (event: 'add-task', title: string, dueDate: Date, priority: 'low' | 'medium' | 'high'): void;
  }>();

  const submit = () => {
    if (!title.value.trim() || !dueDate.value) {
      alert('Title and due date cannot be empty')
      return
    };
    emit('add-task', title.value, dueDate.value, priority.value)
    title.value = ''
    dueDate.value = new Date();
    priority.value = 'low'
  };

  function cancel() {
    title.value = ''
    dueDate.value = new Date();
    priority.value = 'low'
  };
</script>
<template>
  <div class="w-25 mx-auto border px-5 py-3 rounded rounded-3 shadow">
    <form @submit.prevent="submit">
      <div class="mb-2">
        <label for="addtask" class="form-label">Task Name</label>
        <input type="text" class="form-control" id="addtask" v-model="title" placeholder="add a task...">
      </div>
      <div class="mb-2">
        <label for="addduedate" class="form-label">Due Date</label>
        <input type="date" class="form-control" id="addduedate" v-model="dueDate" placeholder="add due date...">
      </div>
      <div class="mb-2">
        <label for="addpriority" class="form-label">Priority</label>
        <select class="form-select" v-model="priority" id="addpriority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary me-2">Submit</button>
      <button @click.prevent="cancel" class="btn btn-danger">cancel</button>
    </form>
  </div>
</template>