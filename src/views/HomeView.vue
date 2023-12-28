<script lang="ts">
import SearchBar from '../components/Search-bar.vue'
import SortHouses from '../components/Sort-houses.vue'

export default {
  components: {
    SortHouses,
    SearchBar
  }
}
</script>

<template>
  <div>
    <Sort-houses />
    <SearchBar />
    <h1>Home</h1>
  </div>
</template>

<style lang="sass"></style>
