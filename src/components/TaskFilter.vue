<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { type Filter } from '@/constants/FilterTypes';

  const filter = ref<Filter>('all');
  const searchQuery = ref<string>('');

  watch([filter, searchQuery], ([value, query]) => {
    emit('filter-button', value);
    emit('search-query', query);
  })

  const emit = defineEmits<{
    (event: 'filter-button', value: Filter): void
    (event: 'search-query', query: string): void
  }>();
</script>

<template>
  <div class="d-flex flex-row mb-3">
    <div class="form-check me-3">
      <input class="form-check-input" type="radio" name="all" id="all" value="all" v-model="filter">
      <label class="form-check-label" for="all">
        All
      </label>
    </div>
    <div class="form-check me-3">
      <input class="form-check-input" type="radio" name="completed" id="completed" value="completed" v-model="filter">
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
  <div class="mb-2 w-25">
    <input type="text" class="form-control" id="search" v-model="searchQuery" placeholder="search a task...">
  </div>

</template>