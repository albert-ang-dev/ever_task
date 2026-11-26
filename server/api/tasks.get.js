// GET /api/tasks — fake data so the store has something to load
export default defineEventHandler(() => [
  { id: 1, title: 'Learn Pinia', done: false },
  { id: 2, title: 'Build ever_task', done: false },
  { id: 3, title: 'Install Nuxt', done: true },
])
