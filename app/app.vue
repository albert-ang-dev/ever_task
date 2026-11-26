<script setup>
const store = useTasksStore()

// Load tasks once on the server; Pinia sends the state to the browser automatically
await callOnce('tasks', () => store.fetchTasks())
</script>

<template>

  <div class="container py-4" style="max-width: 600px">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">ever_task</h1>
      <TaskCounter />
    </div>
    <TaskList />
  </div>
</template>
