export default defineEventHandler((event) => {
  // http://localhost:3000/Nuxt-Livecourse/mike
  const data = {
    name: 'routes',
    age: 1000,
  }
  return { data }
})
