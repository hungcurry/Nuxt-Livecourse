export default defineEventHandler((event) => {
  // http://localhost:3000/Nuxt-Livecourse/api/hello
  const data = {
    name: 'api',
    age: 12,
  }
  return { data }
})
