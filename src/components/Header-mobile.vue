<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Home from '../assets/icons/ic_mobile_navigarion_home@3x.png'
import HomeActive from '../assets/icons/ic_mobile_navigarion_home_active@3x.png'
import About from '../assets/icons/ic_mobile_navigarion_info@3x.png'
import AboutActive from '../assets/icons/ic_mobile_navigarion_info_active@3x.png'
import type { headerMobileLinks } from '../types/types'

const navigationRoutes: headerMobileLinks[] = [
  {
    name: 'Houses',
    title: 'Houses',
    path: '/',
    icon: Home,
    iconActive: HomeActive
  },
  {
    name: 'About',
    title: 'About',
    path: '/about',
    icon: About,
    iconActive: AboutActive
  }
]
</script>

<template>
  <header>
    <nav class="header-nav-mobile">
      <RouterLink
        v-for="(routeNav, index) in navigationRoutes"
        :to="routeNav.path"
        :key="index"
        :class="{ active: $route.path === routeNav.path }"
      >
        <img
          v-if="$route.path === routeNav.path"
          :src="routeNav.iconActive"
          :alt="routeNav.iconActive"
        />
        <img v-else :src="routeNav.icon" :alt="routeNav.icon" />
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss">
.header-nav-mobile {
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: space-around;
  background-color: var(--element-background-2);
  font-family: 'Montserrat', sans-serif;
  height: 10vh;
  bottom: 0;
  z-index: 999;
  align-items: center;

  & img {
    width: 2rem;
  }
}
</style>
