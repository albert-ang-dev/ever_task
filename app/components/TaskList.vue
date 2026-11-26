<script setup>
const store = useTasksStore()

// State and getters: use storeToRefs so they stay reactive after destructuring
const { visibleTasks, filter, loading } = storeToRefs(store)
// Actions: plain functions, destructure directly
const { addTask, toggle, remove } = store

const newTitle = ref('')

function submit() {
  if (!newTitle.value.trim()) return
  addTask(newTitle.value.trim())
  newTitle.value = ''
}
</script>

<template>
  <div>
    <form class="input-group mb-3" @submit.prevent="submit">
      <input v-model="newTitle" class="form-control" placeholder="New task" />
      <button class="btn btn-primary">Add</button>
    </form>

    <select v-model="filter" class="form-select mb-3 w-auto">
      <option value="all">All</option>
      <option value="open">Open</option>
      <option value="done">Done</option>
    </select>

    <p v-if="loading">Loading…</p>

    <ul v-else class="list-group">
      <li
        v-for="t in visibleTasks"
        :key="t.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <label class="mb-0">
          <input type="checkbox" class="form-check-input me-2" :checked="t.done" @change="toggle(t.id)" />
          <span :class="{ 'text-decoration-line-through text-muted': t.done }">{{ t.title }}</span>
        </label>
        <button class="btn btn-sm btn-outline-danger" @click="remove(t.id)">×</button>
      </li>
      <li v-if="!visibleTasks.length" class="list-group-item text-muted">No tasks</li>
    </ul>
  </div>
</template>
