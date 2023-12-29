<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header-c.vue'
import HeaderMobile from './components/Header-mobile.vue'
import { useMonitorSize } from './utils/monitor-sizes'

const { xs, sm } = useMonitorSize()
</script>

<template>
  <Header v-if="!xs && !sm" />
  <HeaderMobile v-if="xs || sm" />
  <main><RouterView /></main>
</template>

<style lang="scss">
main {
  padding-top: 100px;
  width: 100%;
}
</style>
