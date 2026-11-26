// A Pinia store in the "setup" style.
// defineStore, ref and computed are auto-imported by Nuxt + @pinia/nuxt.
export const useTasksStore = defineStore('tasks', () => {
  // ----- state (ref) -----
  const tasks = ref([])
  const filter = ref('all') // 'all' | 'open' | 'done'
  const loading = ref(false)

  // ----- getters (computed) -----
  const visibleTasks = computed(() => {
    if (filter.value === 'open') return tasks.value.filter(t => !t.done)
    if (filter.value === 'done') return tasks.value.filter(t => t.done)
    return tasks.value
  })
  const remaining = computed(() => tasks.value.filter(t => !t.done).length)

  // ----- actions (functions) -----
  function addTask(title) {
    tasks.value.push({ id: Date.now(), title, done: false })
  }

  function toggle(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
  }

  function remove(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  async function fetchTasks() {
    loading.value = true
    try {
      tasks.value = await $fetch('/api/tasks')
    } finally {
      loading.value = false
    }
  }

  // Everything returned here is public (and state is sent from server to client in SSR)
  return { tasks, filter, loading, visibleTasks, remaining, addTask, toggle, remove, fetchTasks }
})
