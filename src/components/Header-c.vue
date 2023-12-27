<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { headerLinks } from '../types/types'

const navigationRoutes: headerLinks[] = [
  {
    name: 'Home',
    title: 'Home',
    path: '/'
  },
  {
    name: 'About',
    title: 'About',
    path: '/about'
  }
]
</script>

<template>
  <header class="header-nav">
    <div class="container">
      <img src="/dtt_logo.png" alt="logo" />

      <nav class="nav-links">
        <RouterLink
          v-for="(routeNav, index) in navigationRoutes"
          :to="routeNav.path"
          :key="index"
          :class="{ active: $route.path === routeNav.path }"
          >{{ routeNav.title }}</RouterLink
        >
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.header-nav {
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: center;
  background-color: var(--element-background-2);
  font-family: 'Montserrat', sans-serif;
  height: 100px;
  z-index: 999;

  & img {
    width: 150px;
  }
}

.container {
  width: 1280px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.nav-links a {
  margin-left: 50px;
  font-size: 18px;
  text-decoration: none;
  color: var(--element-tertiary-2);
  font-weight: 500;

  &.active {
    color: var(--text-primary);
    font-weight: 700;
  }
}
</style>
