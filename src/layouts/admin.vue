<script setup lang="ts"></script>

<template>
  <div class="template">
    <header> admin 模板的表頭</header>
    <main class="content">
      <slot />
    </main>
    <footer> admin 模板的表尾</footer>
  </div>
</template>

<style scoped lang="scss">
header {
  background-color: #0d6efd;
  color: #fff;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
}
.template {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex-grow: 1;
}
footer {
  background-color: #555;
  color: #eee;
  padding: 0.8rem;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}
</style>
