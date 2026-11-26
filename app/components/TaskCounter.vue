<script setup>
// A separate component reading the SAME store — it updates automatically
// whenever TaskList changes the tasks.
const { remaining, tasks } = storeToRefs(useTasksStore())
</script>

<template>
  <span class="badge text-bg-secondary fs-6">
    {{ remaining }} of {{ tasks.length }} left
  </span>
</template>
