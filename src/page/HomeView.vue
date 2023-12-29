<script setup lang="ts">
import CardItem from '../components/Card-item.vue'
import SearchBar from '../components/Search-bar.vue'
import SortHouses from '../components/Sort-houses.vue'
</script>

<template>
  <div class="container-home">
    <Sort-houses />
    <SearchBar />
    <CardItem />
    <h1>Home</h1>
  </div>
</template>

<style lang="scss">
.container-home {
  margin: 0 auto;
  width: 1320px;
}
</style>
