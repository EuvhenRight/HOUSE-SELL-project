<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header-c.vue'
import HeaderMobile from './components/Header-mobile.vue'
import { useMonitorSize } from './utils/monitor-sizes'

const { base, xs, sm } = useMonitorSize()
</script>

<template>
  <Header v-if="!base && !xs && !sm" />
  <HeaderMobile v-if="base || xs || sm" />
  <main><RouterView /></main>
</template>

<style lang="scss">
main {
  padding-top: 100px;
  width: 100%;
}
@media (min-width: 993px) and (max-width: 1321px) {
  #app {
    width: 100%;
  }
}
@media (max-width: 992px) {
  main {
    padding: 0;
  }
  #app {
    width: 100%;
  }
}
</style>
